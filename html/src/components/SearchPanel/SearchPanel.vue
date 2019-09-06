<template>
    <div class="search-panel">
        <div class="container search-panel__container">
            <div v-if="suggestions.categories && suggestions.categories.length > 0" class="search-panel__categories">
                <transition-group tag="ul" name="item" class="search-panel__categories-list" appear>
                    <li key="title" class="text-bold">Категории</li>
                    <li :key="category.id" v-for="category in suggestions.categories">
                        <v-link class="search-panel__categories-link" href="#">{{ category.name }}</v-link>
                    </li>
                </transition-group>
            </div>
            <div v-if="suggestions.products && suggestions.products.length > 0" class="search-panel__products">
                <h3>Популярные товары</h3>
                <transition-group tag="ul" name="item" v-if="!isTabletLg" class="search-panel__products-list" appear>
                    <li class="search-panel__products-card" v-for="product in suggestions.products" :key="product.id">
                        <product-card
                            :product-id="product.id"
                            :name="product.name"
                            :href="product.href"
                            :price="product.price"
                            :old-price="product.oldPrice"
                        />
                    </li>
                </transition-group>
            </div>
        </div>
        <div v-if="isTabletLg" class="search-panel__products-slider" v-swiper:searchSwiper="sliderOptions">
            <div class="swiper-wrapper">
                <div class="swiper-slide" :key="product.id" v-for="product in suggestions.products">
                    <product-card
                        :product-id="product.id"
                        :name="product.name"
                        :href="product.href"
                        :price="product.price"
                        :old-price="product.oldPrice"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VLink from '../controls/VLink/VLink.vue';
import ProductCard from '../ProductCard/ProductCard.vue';
import 'swiper/dist/css/swiper.css';

if (process.env.VUE_ENV === 'client') {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
    Vue.use(VueAwesomeSwiper);
}

import './SearchPanel.css';
import { mapState } from 'vuex';

export default {
    name: 'search-panel',
    components: {
        VLink,
        ProductCard,
    },
    props: {},
    data() {
        return {
            sliderOptions: {
                slidesPerView: 6,
                slidesOffsetBefore: 24,
                freeMode: true,
                freeModeSticky: true,
                grabCursor: true,
                breakpoints: {
                    768: {
                        slidesPerView: 4.5,
                    },
                    480: {
                        slidesPerView: 3.5,
                    },
                    360: {
                        slidesPerView: 2.5,
                    },
                },
            },
        };
    },
    computed: {
        ...mapState('search', ['suggestions']),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
    watch: {
        suggestions(value) {
            this.$nextTick(() => this.searchSwiper && this.searchSwiper.slideTo(0, 0));
        },
    },
};
</script>

