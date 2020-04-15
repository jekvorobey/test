<template>
    <section class="section favorites-view">
        <div class="container favorites-view__header">
            <h1 class="favorites-view__header-h1">
                Избранное
                <span class="favorites-view__header-counter" v-if="favorites.length > 0">
                    {{ favorites.length }} продуктов
                </span>
            </h1>
        </div>

        <div class="container favorites-container" v-if="favorites.length > 0">
            <ul class="favorites-product-list">
                <catalog-product-card
                    class="favorites-product-list__item"
                    v-for="product in favorites"
                    :key="product.id"
                    :offer-id="product.id"
                    :product-id="product.productId"
                    :name="product.name"
                    :type="product.type"
                    :href="`/catalog/${product.categoryCodes[product.categoryCodes.length - 1]}/${product.code}`"
                    :image="product.image"
                    :price="product.price"
                    :old-price="product.oldPrice"
                    :tags="product.tags"
                    :rating="product.rating"
                    :show-buy-btn="product.stock.qty > 0"
                    @add-item="onAddToCart(product)"
                    @preview="onPreview(product.code)"
                    @toggle-favorite-item="onToggleFavorite(product)"
                />
            </ul>
            <div class="favorites-view__main-controls">
                <show-more-button
                    v-if="activePage < pagesCount"
                    btn-class="btn--outline favorites-view__main-controls-btn"
                    preloader-class="favorites-view__preloader"
                    :show-preloader="showMore"
                    @click="onShowMore"
                >
                    Показать ещё
                </show-more-button>
                <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
            </div>
        </div>

        <div class="container" v-else>
            <p>Ничего не найдено</p>
        </div>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger, $route, $router } from '@services';

import {
    NAME as FAVORITES_MODULE,
    FAVORITES,
    FAVORITES_DIRECTION,
    FAVORITES_FIELD,
    ACTIVE_PAGE,
} from '@store/modules/Favorites';
import { PAGES_COUNT } from '@store/modules/Favorites/getters';
import { FETCH_FAVORITES, SET_LOAD_PATH, TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as QUICK_VIEW_MODAL_NAME } from '@components/QuickViewModal/QuickViewModal.vue';
import { NAME as ADD_TO_CART_MODAL_NAME } from '@components/AddToCartModal/AddToCartModal.vue';

import { DEFAULT_PAGE } from '@constants';

import './Favorites.css';

export default {
    name: 'favorites',

    components: {
        VButton,
        VPagination,
        CatalogProductCard,
        ShowMoreButton,
    },

    data() {
        return {
            showMore: false,
        };
    },

    computed: {
        ...mapState(FAVORITES_MODULE, [FAVORITES, FAVORITES_DIRECTION, FAVORITES_FIELD, ACTIVE_PAGE]),
        ...mapGetters(FAVORITES_MODULE, [PAGES_COUNT]),
    },

    methods: {
        ...mapActions(FAVORITES_MODULE, [FETCH_FAVORITES, SET_LOAD_PATH, TOGGLE_FAVORITES_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onShowMore() {
            this.showMore = true;
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this[ACTIVE_PAGE] + 1 },
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page } });
        },

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: QUICK_VIEW_MODAL_NAME, open: true, state: { code } });
        },

        onAddToCart({ id, stock, type }) {
            this[CHANGE_MODAL_STATE]({
                name: ADD_TO_CART_MODAL_NAME,
                open: true,
                state: { offerId: id, storeId: stock.storeId, type },
            });
        },
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: { page = DEFAULT_PAGE },
        } = to;

        const { loadPath } = $store.state[FAVORITES_MODULE];

        if (loadPath === fullPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${FAVORITES_MODULE}/${FETCH_FAVORITES}`, {
                    page,
                })
                .then(data => {
                    $store.dispatch(`${FAVORITES_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                    });
                })
                .catch(thrown => {
                    if (thrown && thrown.isCancel === true) return true;
                    next(vm => {
                        $progress.fail();
                    });
                });
        }
    },

    async beforeRouteUpdate(to, from, next) {
        const {
            query: { page = DEFAULT_PAGE },
        } = to;

        try {
            this.$progress.start();
            await this[FETCH_FAVORITES]({ page, showMore: this.showMore });
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }

        this.showMore = false;
    },
};
</script>
