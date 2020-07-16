<template>
    <div class="search-panel">
        <div class="search-panel__container" v-scroll-lock="search">
            <div class="container">
                <transition-group
                    v-if="categories && categories.length > 0"
                    tag="ul"
                    name="item"
                    class="search-panel__categories-list"
                    appear
                >
                    <li class="search-panel__categories-item" :key="category" v-for="category in categories">
                        <v-link class="search-panel__categories-link" :to="getLink(category)">{{ category }}</v-link>
                    </li>
                </transition-group>

                <div v-if="!isTabletLg && products && products.length > 0" class="search-panel__products">
                    <p class="text-bold search-panel__hl" v-if="searchString === ''">Популярные продукты</p>
                    <transition-group tag="ul" name="item" class="search-panel__products-list" appear>
                        <li class="search-panel__products-card" v-for="item in products" :key="item.id">
                            <catalog-product-card
                                :offer-id="item.id"
                                :product-id="item.productId"
                                :name="item.name"
                                :type="item.type"
                                href="/"
                                :image="generateImageObject(item.image)"
                                :price="item.price"
                                :old-price="item.oldPrice"
                                :tags="item.tags"
                                :rating="item.rating"
                                :show-buy-btn="item.stock.qty > 0"
                            />
                        </li>
                    </transition-group>
                </div>
                <v-button class="btn--outline search-panel__btn" v-if="products && products.length && this.searchString !== ''" @click="toSearchClick">
                    Показать ещё {{ range }}
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
import { NAME as SEARCH_MODULE, SEARCH, SEARCH_STRING, POPULAR_PRODUCTS, SUGGESTIONS } from '@store/modules/Search';
import { GET_POPULAR_PRODUCTS } from '@store/modules/Search/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { productGroupTypes } from '@enums/product';

import './SearchPanel.css';

export default {
    name: 'search-panel',

    components: {
        VLink,
        VButton,

        CatalogProductCard,
    },

    computed: {
        ...mapState(SEARCH_MODULE, [SEARCH, SEARCH_STRING, POPULAR_PRODUCTS, SUGGESTIONS]),
        ...mapState(SEARCH_MODULE, {
            categories: (state) => state[SUGGESTIONS].categories,
        }),

        products() {
            return this.searchString !== '' ? this[SUGGESTIONS].products : this[POPULAR_PRODUCTS];
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        categories() {
            return this.suggestions.suggestions;
        },

        range() {
            return this.suggestions.range;
        }
    },

    methods: {
        ...mapActions(SEARCH_MODULE, [GET_POPULAR_PRODUCTS]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),

        generateImageObject(image) {
            if (image.id) {
                return {
                    id: image.id,
                }
            }
            return {
                id: image,
            }
        },

        toSearchClick() {
            this.$router.replace({
                path: `/${productGroupTypes.SEARCH}/?search_string=${this.searchString}`,
            });
        },

        getLink(category) {
            return {
                path: `/${productGroupTypes.SEARCH}/?search_string=${category}`,
            };
        },
    },

    created() {
        this[GET_POPULAR_PRODUCTS]();
    },
};
</script>
