<template>
    <div class="search-panel">
        <div class="container search-panel__container">
            <ul class="search-panel__categories">
                <li :key="category.id" v-for="category in categories">
                    <v-link href="/">{{ category.name }}</v-link>
                </li>
            </ul>
            <ul v-if="!isTabletLg" class="search-panel__products">
                <product-card
                    class="search-panel__products-card"
                    v-for="product in products"
                    tag="li"
                    :key="product.id"
                    :product-id="product.id"
                    :name="product.name"
                    :href="product.href"
                    :price="product.price"
                    :old-price="product.oldPrice"
                />
            </ul>
            <div v-else class="search-panel__products-slider" v-swiper="options">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" :key="product.id" v-for="product in products">
                        <product-card
                            class="search-panel__products-card"
                            :product-id="product.id"
                            :name="product.name"
                            :href="product.href"
                            :price="product.price"
                            :old-price="product.oldPrice"
                        />
                    </div>
                    <div class="swiper-pagination"></div>
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
import { mapState, mapActions } from 'vuex';

export default {
    name: 'search-panel',
    components: {
        VLink,
        ProductCard,
    },
    props: {},
    data() {
        return {
            options: {
                slidesPerView: 5,
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                    },
                    480: {
                        slidesPerView: 3,
                    },
                    380: {
                        slidesPerView: 2,
                    },
                },
            },
            mounted: false,
            categories: [
                {
                    id: 1,
                    name: 'Шампунь',
                },
                {
                    id: 2,
                    name: 'Шампунь для жирных волос',
                },
                {
                    id: 3,
                    name: 'Шампунь для вьющихся волос',
                },
                {
                    id: 4,
                    name: 'Шампунь-спрей',
                },
                {
                    id: 5,
                    name: 'Восстанавливающий шампунь',
                },
                {
                    id: 6,
                    name: 'Шампунь для окрашенных волос',
                },
                {
                    id: 7,
                    name: 'Шампунь для объема',
                },
                {
                    id: 8,
                    name: 'Шампунь для мужчин',
                },
            ],
            products: [
                {
                    id: 1,
                    name: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 2,
                    name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 3,
                    name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 4,
                    name: 'Alterna Шампунь лифтинг для объема, 200 мл',
                },
                {
                    id: 5,
                    name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 6,
                    name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 7,
                    name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 8,
                    name: 'R+Co Шампунь для совершенства волос, 240 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 9,
                    name: 'Alterna Шампунь лифтинг для объема, 200 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 10,
                    name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 11,
                    name: 'Alterna Шампунь лифтинг для объема, 200 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 12,
                    name: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 13,
                    name: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
                {
                    id: 14,
                    name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                    price: '1 900 ₽',
                    oldPrice: '1 600 ₽',
                },
            ],
        };
    },
    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
    methods: {},
    mounted() {
        this.mounted = true;
    },
};
</script>

