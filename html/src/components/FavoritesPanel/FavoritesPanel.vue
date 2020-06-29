<template>
    <general-popup-panel
        popover-class="tooltip--white favorites-panel"
        header="Избранное"
        trigger="hover"
        placement="bottom-end"
        @applyShow="applyShow"
        @applyHide="applyHide"
    >
        <slot />
        <template v-slot:body>
            <ul ref="favorites_panel" class="favorites-panel__list" v-if="favoritesList.length > 0">
                <cart-panel-product-card
                    class="favorites-panel__list-item"
                    v-for="product in favoritesList"
                    :key="product.id"
                    :product-id="product.id"
                    :type="product.type"
                    :name="product.name"
                    :stock="product.stock"
                    :image="product.image"
                    :price="product.price"
                    :old-price="product.oldPrice"
                    :href="generateItemProductUrl(product)"
                    :insideBasket="product.insideBasket"
                    @add-item="onAddToCart(product)"
                    isFavorite
                />
                <img
                    v-if="isLoadMore"
                    :src="preloaderIcon"
                    class="preloader favorites-panel__preloader"
                    width="30"
                    height="30"
                />
            </ul>
            <div class="favorites-panel__total" v-else>
                Раздел "Избранное" пуст
            </div>
        </template>
    </general-popup-panel>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';
import CartPanelProductCard from '@components/CartPanelProductCard/CartPanelProductCard.vue';

import { mapActions, mapState, mapGetters } from 'vuex';
import { $store, $progress, $logger } from '@services';

import { PAGES_COUNT } from '@store/modules/Favorites/getters';
import { ADD_CART_ITEM, ADD_CART_BUNDLE } from '@store/modules/Cart/actions';

import preloader from '@images/icons/preloader.svg';

import './FavoritesPanel.css';
import { CART_TYPES } from '@store/modules/Cart/getters';

import { generateProductUrl } from '@util/catalog';
import _debounce from 'lodash/debounce';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';
export default {
    name: 'favorites-panel',

    components: {
        VSvg,
        VLink,
        CartPanelProductCard,
        GeneralPopupPanel,
    },

    data() {
        return {
            page: 1,
            listener: null,
            debounce_favorites: null,
        };
    },

    props: {
        allFavorites: {
            type: Array,
            default() {
                return [];
            },
        },
        isLoadMore: {
            type: Boolean,
        },
    },

    computed: {
        ...mapGetters(CART_MODULE, [CART_TYPES]),
        favoritesList() {
            if (this.cartTypes && this.cartTypes[0]) {
                const cartItems = this.cartTypes[0].items;
                return this.allFavorites.map(fav => {
                    const basketInclude = cartItems.find(({ p }) => fav.id === (p && p.id));
                    return {
                        ...fav,
                        insideBasket: !!basketInclude,
                    };
                });
            }
            return this.allFavorites;
        },
        preloaderIcon() {
            return preloader;
        },
    },

    created() {
        this.debounce_favorites = _debounce(this.loadMore, 300);
    },

    methods: {
        applyShow() {
            setTimeout(() => {
                const listElm = this.$refs.favorites_panel;
                if (listElm && this.isLoadMore) {
                    this.listener = e => {
                        if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight - 150) {
                            this.debounce_favorites();
                        }
                    };
                    listElm.addEventListener('scroll', this.listener);
                }
            }, 700);
        },

        applyHide() {
            const listElm = this.$refs.favorites_panel;
            if (listElm) {
                listElm.removeEventListener('scroll', this.listener);
            }
        },

        onAddToCart({ id, stock, type }) {
            this[ADD_CART_ITEM]({ offerId: id, storeId: stock.storeId });
        },

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },

        async loadMore() {
            if (this.isLoadMore) {
                const count = this.allFavorites.length;
                this.page++;
                await this.$emit('fetchFavorites', this.page);
            }
        },

        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
    },
};
</script>
