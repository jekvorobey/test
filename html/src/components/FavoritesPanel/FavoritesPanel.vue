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
            <div class="favorites-panel__body">
                <v-scroll class="favorites-panel__scroll" v-if="favoritesList.length > 0">
                    <ul ref="favorites_panel" class="favorites-panel__list">
                        <cart-panel-product-card
                            class="favorites-panel__list-item"
                            v-for="product in favoritesList"
                            :key="product.id"
                            :type="product.type"
                            :name="product.name"
                            :stock="product.stock"
                            :image="product.image"
                            :price="product.price"
                            :old-price="product.oldPrice"
                            :href="generateItemProductUrl(product)"
                            :inside-basket="product.insideBasket"
                            :is-load-button="product.isLoadButton"
                            :freeBuy="product.freeBuy"
                            @add-item="onAddToCart(product)"
                            is-favorite
                        />
                        <v-spinner :show="isLoadMore" class="favorites-panel__preloader" width="30" height="30" />
                    </ul>
                </v-scroll>

                <div class="favorites-panel__total" v-else>Раздел "Избранное" пуст</div>
            </div>
        </template>
    </general-popup-panel>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';
import VScroll from '@controls/VScroll/VScroll.vue';

import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';
import CartPanelProductCard from '@components/CartPanelProductCard/CartPanelProductCard.vue';

import { mapActions, mapState, mapGetters } from 'vuex';

import { PAGES_COUNT } from '@store/modules/Favorites/getters';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';
import { CART_TYPES } from '@store/modules/Cart/getters';
import { ADD_CART_ITEM, ADD_CART_BUNDLE } from '@store/modules/Cart/actions';

import preloader from '@images/icons/preloader.svg';

import _debounce from 'lodash/debounce';
import { $store, $progress, $logger } from '@services';
import { generateProductUrl } from '@util/catalog';
import './FavoritesPanel.css';

export default {
    name: 'favorites-panel',

    components: {
        VSvg,
        VLink,
        VSpinner,
        VScroll,

        CartPanelProductCard,
        GeneralPopupPanel,
    },

    data() {
        return {
            page: 1,
            listener: null,
            debounce_favorites: null,
            favoritesBtns: [],
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
                return this.allFavorites.map((fav) => {
                    const basketInclude = cartItems.find(({ p }) => fav.id === (p && p.id));
                    const btnLoader = this.favoritesBtns.find(({ id }) => id === fav.id);

                    return {
                        ...fav,
                        insideBasket: !!basketInclude,
                        isLoadButton: (btnLoader && btnLoader.isLoadButton) || false,
                    };
                });
            }
            return this.allFavorites;
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),

        applyShow() {
            setTimeout(() => {
                const listElm = this.$refs.favorites_panel;
                if (listElm && this.isLoadMore) {
                    this.listener = (e) => {
                        if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight - 150) {
                            this.debounce_favorites();
                        }
                    };
                    listElm.addEventListener('scroll', this.listener);
                    this.genShowBtns();
                }
            }, 700);
        },

        genShowBtns() {
            this.favoritesBtns = this.favoritesList.map((fav) => {
                return {
                    id: fav.id,
                    isLoadButton: false,
                };
            });
        },

        applyHide() {
            const listElm = this.$refs.favorites_panel;
            if (listElm) {
                listElm.removeEventListener('scroll', this.listener);
            }
        },

        async onAddToCart({ id, stock, type }) {
            const btnLoaderIndex = this.favoritesBtns.findIndex((fav) => id === fav.id);
            this.favoritesBtns.splice(btnLoaderIndex, 1, {
                ...this.favoritesBtns[btnLoaderIndex],
                isLoadButton: true,
            });

            await this[ADD_CART_ITEM]({ offerId: id, storeId: stock.storeId });

            this.favoritesBtns.splice(btnLoaderIndex, 1, {
                ...this.favoritesBtns[btnLoaderIndex],
                isLoadButton: false,
            });
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
    },

    created() {
        this.debounce_favorites = _debounce(this.loadMore, 300);
    },
};
</script>
