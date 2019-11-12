<template>
    <div class="search-panel">
        <div class="search-panel__container" v-scroll-lock="search">
            <div class="container">
                <p v-if="isTabletLg" class="text-medium text-grey search-panel__hl">Популярные запросы</p>

                <transition-group
                    v-if="categories && categories.length > 0"
                    tag="ul"
                    name="item"
                    class="search-panel__categories-list"
                    appear
                >
                    <li class="search-panel__categories-item" :key="category.id" v-for="category in categories">
                        <v-link class="search-panel__categories-link" href="#">{{ category.name }}</v-link>
                    </li>
                </transition-group>

                <div v-if="!isTabletLg && products && products.length > 0" class="search-panel__products">
                    <p class="text-bold search-panel__hl" v-if="searchString === ''">Популярные продукты</p>
                    <transition-group tag="ul" name="item" class="search-panel__products-list" appear>
                        <li class="search-panel__products-card" v-for="product in products" :key="product.id">
                            <catalog-product-card
                                :product-id="product.id"
                                :name="product.name"
                                :type="product.type"
                                href="/"
                                :image="product.image"
                                :price="product.price"
                                :old-price="product.oldPrice"
                                :tags="product.tags"
                                :rating="product.rating"
                                @addItem="ADD_CART_ITEM({ item: product })"
                            />
                        </li>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';
import CatalogProductCard from '../CatalogProductCard/CatalogProductCard.vue';

import './SearchPanel.css';
import { mapState, mapGetters, mapActions } from 'vuex';

import {
    NAME as SEARCH_MODULE,
    SEARCH,
    SEARCH_STRING,
    POPULAR_PRODUCTS,
    SUGGESTIONS,
} from '../../store/modules/Search';
import { GET_POPULAR_PRODUCTS } from '../../store/modules/Search/actions';

import { NAME as CART_MODULE } from '../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../store/modules/Cart/actions';

export default {
    name: 'search-panel',

    components: {
        VLink,
        CatalogProductCard,
    },

    computed: {
        ...mapState(SEARCH_MODULE, [SEARCH, SEARCH_STRING, POPULAR_PRODUCTS, SUGGESTIONS]),
        ...mapState(SEARCH_MODULE, {
            categories: state => state[SUGGESTIONS].categories,
        }),

        products() {
            return this.searchString !== '' ? this[SUGGESTIONS].products : this[POPULAR_PRODUCTS];
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(SEARCH_MODULE, [GET_POPULAR_PRODUCTS]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
    },

    created() {
        this[GET_POPULAR_PRODUCTS]();
    },
};
</script>

