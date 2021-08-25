<template>
    <section class="section favorites-view">
        <div class="container">
            <breadcrumbs class="favorites-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span></breadcrumb-item
                >
                <breadcrumb-item key="Favorites" :to="$route.path">{{ catalogTitle }}</breadcrumb-item>
            </breadcrumbs>
        </div>

        <section class="section favorites-view__section">
            <div class="container favorites-view__header">
                <h1 class="favorites-view__header-hl">
                    {{ catalogTitle }}
                    <span class="favorites-view__header-counter" v-if="favoritesAll.length > 0">
                        {{ favoritesAll.length }}
                        {{ productName }}
                    </span>
                </h1>
                <div class="favorites-view__filters" v-if="favorites.length > 0">
                    <v-button class="btn--transparent favorites-view__filters-btn" @click="onClearFavorites">
                        <v-svg class="favorites-view__filters-icon" name="cross" width="24" height="24" />
                        Очистить все
                    </v-button>
                    <v-select
                        class="favorites-view__filters-sort"
                        label="title"
                        track-by="id"
                        v-model="sortValue"
                        :options="sortOptions"
                        :searchable="false"
                        :allow-empty="false"
                        :show-labels="false"
                    />
                </div>
            </div>

            <div class="container favorites-view__section-container" v-if="favorites.length > 0">
                <ul class="favorites-view__list">
                    <catalog-product-card
                        class="favorites-view__list-item"
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
                        :is-price-hidden="product.isPriceHidden"
                        :badges="product.badges"
                        :rating="product.rating"
                        :show-buy-btn="product.stock.qty > 0"
                        @add-item="onAddToCart(product)"
                        @preview="onPreview(product.code)"
                        @toggle-favorite-item="onToggleFavorite(product)"
                    />
                </ul>
            </div>
            <p class="container" v-else>Ничего не найдено</p>

            <div class="container favorites-view__main-controls" v-if="pagesCount > 1">
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
        </section>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import VSvg from '@controls/VSvg/VSvg.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger } from '@services';

import {
    NAME as FAVORITES_MODULE,
    FAVORITES,
    FAVORITES_ALL,
    FAVORITES_DIRECTION,
    FAVORITES_FIELD,
    ACTIVE_PAGE,
} from '@store/modules/Favorites';
import { PAGES_COUNT } from '@store/modules/Favorites/getters';
import {
    FETCH_FAVORITES,
    SET_LOAD_PATH,
    TOGGLE_FAVORITES_ITEM,
    DELETE_FAVORITES_ALL,
} from '@store/modules/Favorites/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { pluralize } from '@util';
import { DEFAULT_PAGE } from '@constants';
import { modalName, sortDirections } from '@enums';
import { sortFields } from '@enums/favorites';
import metaMixin from '@plugins/meta';
import '@images/sprites/home.svg';
import './Favorites.css';

export default {
    name: 'favorites',
    mixins: [metaMixin],

    components: {
        VButton,
        VPagination,
        VSelect,
        VSvg,

        CatalogProductCard,
        ShowMoreButton,
        Breadcrumbs,
        BreadcrumbItem,
    },

    metaInfo() {
        const { catalogTitle, activePage } = this;
        return {
            title: activePage > 1 ? `${catalogTitle} – страница ${activePage}` : catalogTitle,
        };
    },

    data() {
        const sortOptions = [
            { id: 1, title: 'Сначала дороже', field: sortFields.PRICE, direction: sortDirections.DESC },
            { id: 2, title: 'Сначала дешевле', field: sortFields.PRICE, direction: sortDirections.ASC },
        ];
        return {
            sortValue: sortOptions[0],
            sortOptions,
            showMore: false,
        };
    },

    computed: {
        ...mapState(FAVORITES_MODULE, [FAVORITES, FAVORITES_ALL, FAVORITES_DIRECTION, FAVORITES_FIELD, ACTIVE_PAGE]),
        ...mapGetters(FAVORITES_MODULE, [PAGES_COUNT]),

        productName() {
            return pluralize(this.favoritesAll.length, ['продукт', 'продукта', 'продуктов']);
        },

        catalogTitle() {
            return 'Избранное';
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        sortValue(value, oldValue) {
            if (value !== oldValue) {
                this.$router.replace({
                    path: this.$route.path,
                    query: { orderField: value.field, orderDirection: value.direction },
                });
            }
        },
    },

    methods: {
        ...mapActions(FAVORITES_MODULE, [FETCH_FAVORITES, SET_LOAD_PATH, TOGGLE_FAVORITES_ITEM, DELETE_FAVORITES_ALL]),
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
            this.$router.push({
                path: this.$route.path,
                query: { ...this.$route.query, page: page > DEFAULT_PAGE ? page : undefined },
            });
        },

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onAddToCart(item) {
            const { code, type, stock, id } = item;
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.ADD_TO_CART,
                open: true,
                state: { offerId: id, storeId: stock && stock.storeId, type },
            });
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.QUICK_VIEW,
                open: true,
                state: { code },
            });
        },

        onClearFavorites() {
            this[DELETE_FAVORITES_ALL]();
        },

        setSortValue(field, direction) {
            this.sortValue =
                this.sortOptions.find((o) => o.field === field && o.direction === direction) || this.sortOptions[0];
        },
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: { page = DEFAULT_PAGE, orderField = sortFields.PRICE, orderDirection = sortDirections.DESC },
        } = to;

        function proceed() {
            if ($store.state[FAVORITES_MODULE]) {
                const { loadPath } = $store.state[FAVORITES_MODULE];
                // if (loadPath === fullPath) {
                //     next(vm => vm.setSortValue(orderField, orderDirection));
                //     $store.dispatch(`${FAVORITES_MODULE}/${FETCH_FAVORITES}`, {
                //         page,
                //         orderField,
                //         orderDirection,
                //     });
                // } else {
                $progress.start();
                $store
                    .dispatch(`${FAVORITES_MODULE}/${FETCH_FAVORITES}`, {
                        page,
                        orderField,
                        orderDirection,
                    })
                    .then((data) => {
                        $store.dispatch(`${FAVORITES_MODULE}/${SET_LOAD_PATH}`, fullPath);
                        next((vm) => {
                            vm.setSortValue(orderField, orderDirection);
                            $progress.finish();
                        });
                    })
                    .catch((thrown) => {
                        if (thrown && thrown.isCancel === true) return true;
                        next((vm) => {
                            $progress.fail();
                        });
                    });
            }
        }

        if ($store.state[FAVORITES_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[FAVORITES_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },

    async beforeRouteUpdate(to, from, next) {
        const {
            query: { page = DEFAULT_PAGE, orderField = sortFields.PRICE, orderDirection = sortDirections.DESC },
        } = to;

        try {
            this.$progress.start();

            await this[FETCH_FAVORITES]({ page, orderField, orderDirection, showMore: this.showMore });

            this.setSortValue(orderField, orderDirection);
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
