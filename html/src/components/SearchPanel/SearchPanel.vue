<template>
    <div class="search-panel">
        <div class="search-panel__container" v-scroll-lock="search">
            <div class="container">
                <ul class="search-panel__categories-list">
                    <template v-if="searchString !== '' && categories && categories.length > 0">
                        <li class="search-panel__categories-item" :key="category" v-for="category in categories">
                            <v-link class="search-panel__categories-link" :to="getLink(category)">{{
                                category
                            }}</v-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="search-panel__categories-item" :key="request" v-for="request in popularRequests">
                            <v-link class="search-panel__categories-link" :to="getLink(request)">{{ request }}</v-link>
                        </li>
                    </template>
                </ul>

                <div data-retailrocket-markup-block="5f21670297a5282edc07d7cc" />
                <script>
                    retailrocket.markup.render();
                </script>

                <div v-if="!isTablet && products && products.length > 0" class="search-panel__products">
                    <p class="text-bold search-panel__hl" v-if="searchString === ''">Популярные товары</p>
                    <ul class="search-panel__products-list" :class="{ 'has-preloader': preloader }">
                        <li class="search-panel__products-card" v-for="item in products" :key="item.id">
                            <catalog-product-card
                                :offer-id="item.id"
                                :product-id="item.productId"
                                :name="item.name"
                                :type="item.type"
                                :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                                :image="generateImageObject(item.image)"
                                :price="item.price"
                                :old-price="item.oldPrice"
                                :badges="item.badges"
                                :rating="item.rating"
                                :show-buy-btn="item.stock.qty > 0"
                                @add-item="onAddToCart(item)"
                                @preview="onPreview(item.code)"
                                @toggle-favorite-item="onToggleFavorite(item)"
                            />
                        </li>
                    </ul>
                </div>
                <v-button class="btn--outline search-panel__btn" v-if="showSubmitBtn" @click="toSearchClick">
                    {{ getSearchBtnText }}
                </v-button>
            </div>
        </div>
    </div>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';

import { mapState, mapGetters, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import {
    NAME as SEARCH_MODULE,
    SEARCH,
    SEARCH_STRING,
    POPULAR_PRODUCTS,
    SUGGESTIONS,
    POPULAR_REQUESTS,
    PRELOADER,
} from '@store/modules/Search';
import { GET_POPULAR_PRODUCTS, GET_POPULAR_REQUESTS, SET_SEARCH } from '@store/modules/Search/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { productGroupTypes } from '@enums/product';
import { modalName } from '@enums';
import './SearchPanel.css';

export default {
    name: 'search-panel',

    components: {
        VLink,
        VButton,

        CatalogProductCard,
    },

    computed: {
        ...mapState(SEARCH_MODULE, [SEARCH, SEARCH_STRING, POPULAR_PRODUCTS, SUGGESTIONS, POPULAR_REQUESTS, PRELOADER]),
        ...mapState(SEARCH_MODULE, {
            categories: state => state[SUGGESTIONS].categories,
        }),

        products() {
            return this.searchString && this[SUGGESTIONS].products
                ? this[SUGGESTIONS].products
                : this[POPULAR_PRODUCTS];
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        categories() {
            return this.suggestions.suggestions;
        },

        range() {
            return this.suggestions.range;
        },

        getSearchBtnText() {
            if (!this.isTabletLg) {
                return `Показать ещё ${this.range} товаров`;
            }
            return `Найдено ${this.range} товаров`;
        },

        showSubmitBtn() {
            return this.products && this.products.length && this.searchString !== '' && this[SUGGESTIONS].products;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(SEARCH_MODULE, [GET_POPULAR_PRODUCTS, GET_POPULAR_REQUESTS, SET_SEARCH]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        generateImageObject(image) {
            if (image.id) {
                return {
                    id: image.id,
                };
            }
            return {
                id: image,
            };
        },

        toSearchClick() {
            this.$router.replace({
                path: `/${productGroupTypes.SEARCH}/?search_string=${this.searchString}`,
            });
            this[SET_SEARCH](false);
        },

        getLink(category) {
            return {
                path: `/${productGroupTypes.SEARCH}/?search_string=${category}`,
            };
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: modalName.general.QUICK_VIEW, open: true, state: { code } });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.ADD_TO_CART,
                open: true,
                state: { offerId: item.id, storeId: item.stock.storeId, type: item.type },
            });
        },
    },

    created() {
        Promise.all([this[GET_POPULAR_PRODUCTS](), this[GET_POPULAR_REQUESTS]()]);
    },
};
</script>
