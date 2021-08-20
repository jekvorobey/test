<template>
    <div class="search-panel">
        <div class="search-panel__container" v-scroll-lock="search">
            <search-filter
                class="container search-panel__search"
                :class="{ 'search-panel__search--scroll': scroll }"
                v-focus
                input-id="lower-filter"
                v-if="isTabletLg || scroll"
            />

            <div class="container search-panel__request">
                <h2 class="text-grey text-medium search-panel__hl" v-if="isTablet">Популярные запросы</h2>

                <ul class="search-panel__categories-list">
                    <template v-if="!isEmpty && categories && categories.length > 0">
                        <li class="search-panel__categories-item" :key="category.name" v-for="category in categories">
                            <v-link
                                class="search-panel__categories-link"
                                :to="category.url"
                                @click="onSetSearch(false)"
                            >
                                {{ category.name }}
                            </v-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="search-panel__categories-item" :key="request.name" v-for="request in requests">
                            <v-link class="search-panel__categories-link" :to="request.url" @click="onSetSearch(false)">
                                {{ request.name }}
                            </v-link>
                        </li>
                    </template>
                </ul>

                <retail-rocket-container
                    data-retailrocket-markup-block="5f21670297a5282edc07d7cc"
                    :data-auth="hasSession ? 'true' : 'false'"
                    :data-user-moderation="canBuy ? 'true' : 'false'"
                />

                <template v-if="!isTablet && products && products.length > 0">
                    <div class="search-panel__products">
                        <p class="text-bold search-panel__hl" v-if="isEmpty">Популярные товары</p>
                        <ul class="search-panel__products-list" :class="{ 'has-preloader': preloader }">
                            <li class="search-panel__products-card" v-for="item in products" :key="item.id">
                                <catalog-product-card
                                    :offer-id="item.id"
                                    :product-id="item.productId"
                                    :name="item.name"
                                    :type="item.type"
                                    :href="item.url"
                                    :image="item.image"
                                    :price="item.price"
                                    :old-price="item.oldPrice"
                                    :badges="item.badges"
                                    :rating="item.rating"
                                    :is-price-hidden="item.isPriceHidden"
                                    :show-buy-btn="item.stock.qty > 0"
                                    @add-item="onAddToCart(item)"
                                    @preview="onPreview(item.code)"
                                    @toggle-favorite-item="onToggleFavorite(item)"
                                />
                            </li>
                        </ul>
                    </div>

                    <v-button class="btn--outline search-panel__btn" v-if="showSubmitBtn" @click="onSearch">
                        {{ searchBtnText }}
                    </v-button>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import SearchFilter from '@components/SearchFilter/SearchFilter.vue';
import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';

import { mapState, mapActions } from 'vuex';
import { SCROLL } from '@store';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import {NAME as AUTH_MODULE, HAS_SESSION, CAN_BUY, USER} from '@store/modules/Auth';

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
import { generateProductUrl, generateSearchUrl } from '@util/catalog';
import { modalName, eventName } from '@enums';
import './SearchPanel.css';

export default {
    name: 'search-panel',

    components: {
        VLink,
        VButton,

        CatalogProductCard,
        SearchFilter,
        RetailRocketContainer,
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState(SEARCH_MODULE, [SEARCH, SEARCH_STRING, POPULAR_PRODUCTS, SUGGESTIONS, POPULAR_REQUESTS, PRELOADER]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

        products() {
            const { isEmpty } = this;
            const { products } = this[SUGGESTIONS] || {};
            const popularProducts = this[POPULAR_PRODUCTS];
            const collection = (!isEmpty && products) || popularProducts || [];

            return collection.map((i) => ({
                ...i,
                url: generateProductUrl(i.categoryCodes[i.categoryCodes.length - 1], i.code),
                image: this.generateImageObject(i.image),
            }));
        },

        requests() {
            const requests = this[POPULAR_REQUESTS] || [];
            return requests.map((r) => ({ name: r, url: generateSearchUrl(r) }));
        },

        categories() {
            const { suggestions = [] } = this[SUGGESTIONS] || {};
            return suggestions.map((s) => ({ name: s, url: generateSearchUrl(s) }));
        },

        range() {
            const { range } = this[SUGGESTIONS] || {};
            return range || 0;
        },

        searchBtnText() {
            const { range, isTabletLg } = this;

            if (!isTabletLg) return `Показать ещё ${range} товаров`;
            return `Найдено ${range} товаров`;
        },

        showSubmitBtn() {
            const { range, isEmpty } = this;
            return range && !isEmpty;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isEmpty() {
            return !this[SEARCH_STRING];
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(SEARCH_MODULE, [GET_POPULAR_PRODUCTS, GET_POPULAR_REQUESTS, SET_SEARCH]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        generateImageObject(image) {
            if (!image) return null;
            if (image.id) return image;
            return {
                id: image,
            };
        },

        generateLink(category) {
            return `/${productGroupTypes.SEARCH}/?search_string=${category}`;
        },

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onSearch() {
            this.$router.replace({
                path: `/${productGroupTypes.SEARCH}/?search_string=${this.searchString}`,
            });
            this.onSetSearch(false);
        },

        onAddToCart(item) {
            const { code, type, stock, id, variantGroups } = item;

            if (variantGroups) this.onPreview(code);
            else
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

        onSetSearch(value) {
            this[SET_SEARCH](value);
        },

        onKeyUp(e) {
            if (e.key === 'Escape') this.onSetSearch(false);
        },
    },

    beforeMount() {
        document.addEventListener(eventName.KEYUP, this.onKeyUp);
    },

    mounted() {
        this[GET_POPULAR_PRODUCTS]();
        this[GET_POPULAR_REQUESTS]();
    },

    beforeDestroy() {
        document.removeEventListener(eventName.KEYUP, this.onKeyUp);
    },
};
</script>
