<template>
    <div class="search-panel">
        <div class="container search-panel__container" v-scroll-lock="search">
            <transition-group
                v-if="categories && categories.length > 0"
                tag="ul"
                name="item"
                class="search-panel__categories-list"
                appear
            >
                <li :key="category.id" v-for="category in categories">
                    <v-link class="search-panel__categories-link" href="#">{{ category.name }}</v-link>
                </li>
            </transition-group>
            <div v-if="products && products.length > 0" class="search-panel__products">
                <transition-group tag="ul" name="item" class="search-panel__products-list" appear>
                    <li class="search-panel__products-card" v-for="product in products" :key="product.id">
                        <catalog-product-card
                            :product-id="product.id"
                            :name="product.name"
                            href="/"
                            :image="product.image"
                            :price="product.price"
                            :old-price="product.oldPrice"
                            :tags="product.tags"
                            :rating="product.rating"
                        />
                    </li>
                </transition-group>
            </div>
        </div>
        <div class="search-panel__mask" />
    </div>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';
import CatalogProductCard from '../CatalogProductCard/CatalogProductCard.vue';

import './SearchPanel.css';
import { mapState } from 'vuex';

export default {
    name: 'search-panel',
    components: {
        VLink,
        CatalogProductCard,
    },
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapState('search', ['search']),
        ...mapState('search', {
            categories: state => state.suggestions.categories,
            products: state =>
                state.searchString ? state.suggestions.products.slice(0, 8) : state.suggestions.products.slice(8, 14),
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
};
</script>

