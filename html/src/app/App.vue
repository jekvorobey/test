<template>
    <div id="app" class="fake-vue-body" :class="{ 'fake-vue-body--scroll': scroll }">
        <v-header />
        <main>
            <!-- <transition name="fade" mode="out-in"> -->
            <router-view class="view" />
            <!-- </transition> -->
        </main>
        <v-footer />
    </div>
</template>

<script>
import './App.critical.css';
import './App.css';

import Vue from 'vue';

/**
 * Базовые компоненты страницы
 */

// Часто используемые(и маленькие) компоненты лучше добавить сразу в основной бандл,
// ибо они используются повсеместно на всех страницах, и смысла выносить их в отдельный бандл и грузить отдельно нет
import VSvg from '../components/controls/VSvg/VSvg.vue';
import VLink from '../components/controls/VLink/VLink.vue';
import VButton from '../components/controls/VButton/VButton.vue';
import VInput from '../components/controls/VInput/VInput.vue';
import VSticky from '../components/controls/VSticky/VSticky.vue';
import VPicture from '../components/controls/VPicture/VPicture.vue';

import VHeader from '../components/VHeader/VHeader.vue';
import VFooter from '../components/VFooter/VFooter.vue';

import SingleBannerSection from '../components/blocks/SingleBannerSection/SingleBannerSection.vue';
import ListBannersSection from '../components/blocks/ListBannersSection/ListBannersSection.vue';
import SliderBannersSection from '../components/blocks/SliderBannersSection/SliderBannersSection.vue';
import CategoriesSection from '../components/blocks/CategoriesSection/CategoriesSection.vue';
import ProductsSection from '../components/blocks/ProductsSection/ProductsSection.vue';
import BrandsSection from '../components/blocks/BrandsSection/BrandsSection.vue';
import InstagramSection from '../components/blocks/InstagramSection/InstagramSection.vue';

import _debounce from 'lodash/debounce';
import { MIN_SCROLL_VALUE, eventName } from '../assets/scripts/constants';
import { mapState, mapActions } from 'vuex';

// const SliderBannersSection = () => ({
//     // Загружаемый компонент. Значение должно быть Promise
//     component: import(
//         /* webpackChunkName: "slider-banners-section" */ '../components/blocks/SliderBannersSection/SliderBannersSection.vue'
//     ),
// });

// const CategoriesSection = () => ({
//     // Загружаемый компонент. Значение должно быть Promise
//     component: import(
//         /* webpackChunkName: "categories-section" */ '../components/blocks/CategoriesSection/CategoriesSection.vue'
//     ),
// });

// const ProductsSection = () => ({
//     // Загружаемый компонент. Значение должно быть Promise
//     component: import(
//         /* webpackChunkName: "products-section" */ '../components/blocks/ProductsSection/ProductsSection.vue'
//     ),
// });

// const BrandsSection = () => ({
//     // Загружаемый компонент. Значение должно быть Promise
//     component: import(/* webpackChunkName: "brands-section" */ '../components/blocks/BrandsSection/BrandsSection.vue'),
// });

// const InstagramSection = () => ({
//     // Загружаемый компонент. Значение должно быть Promise
//     component: import(
//         /* webpackChunkName: "instagram-section" */ '../components/blocks/InstagramSection/InstagramSection.vue'
//     ),
//});

Vue.component('single-banner-section', SingleBannerSection);
Vue.component('list-banners-section', ListBannersSection);
Vue.component('slider-banners-section', SliderBannersSection);
Vue.component('brands-section', BrandsSection);
Vue.component('categories-section', CategoriesSection);
Vue.component('products-section', ProductsSection);
Vue.component('instagram-section', InstagramSection);

export default {
    name: 'app',
    components: {
        VHeader,
        VFooter,
    },

    computed: {
        ...mapState(['scroll']),
    },

    methods: {
        ...mapActions(['SET_SCROLL']),

        onScroll() {
            this.SET_SCROLL(
                document.body.scrollTop > MIN_SCROLL_VALUE || document.documentElement.scrollTop > MIN_SCROLL_VALUE
            );
        },
    },

    mounted() {
        const onSetScrollDebounce = _debounce(this.onScroll, 20);
        document.addEventListener(eventName.SCROLL, onSetScrollDebounce, true);
        this.$on('hook:beforeDestroy', () => document.removeEventListener(eventName.SCROLL, onSetScrollDebounce));
    },
};
</script>



