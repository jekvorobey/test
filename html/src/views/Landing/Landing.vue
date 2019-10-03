<template>
    <section class="section landing-view">
        <div class="container">
            <ul class="landing-view__categories">
                <li :key="link.id" v-for="link in categoryLinks">
                    <router-link :to="link.to">{{ link.title }}</router-link>
                </li>
            </ul>

            <div class="landing-view__banners">
                <div class="landing-view__banners-left">
                    <div class="landing-view__main-banner">
                        <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                    </div>
                    <div class="landing-view__main-banner">
                        <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                    </div>
                </div>
                <div class="landing-view__banners-right">слайдер с баннерами</div>
            </div>

            <div class="landing-view__category-cards">
                карточки категорий
            </div>

            <section class="section landing-view__products">
                <h2 class="landing-view____products-hl">Новинки</h2>
                <router-link class="landing-view__products-link" to="/">Смотреть все</router-link>

                <v-slider class="landing-view__products-slider" name="new-products" :options="swiperOption">
                    <catalog-product-card
                        class="swiper-slide"
                        v-for="product in newProducts"
                        :key="product.id"
                        :product-id="product.id"
                        :name="product.name"
                        :href="product.href"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :tags="product.tags"
                        :rating="product.rating"
                    />
                </v-slider>
            </section>

            <section class="section landing-view__products">
                <h2 class="landing-view____products-hl">Бестселлеры</h2>
                <router-link class="landing-view__products-link" to="/">Смотреть все</router-link>

                <v-slider class="landing-view__products-slider" name="bestseller-products" :options="swiperOption">
                    <catalog-product-card
                        class="swiper-slide"
                        v-for="product in bestsellerProducts"
                        :key="product.id"
                        :product-id="product.id"
                        :name="product.name"
                        :href="product.href"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :tags="product.tags"
                        :rating="product.rating"
                    />
                </v-slider>
            </section>

            <div class="landing-view__category-banners">
                <div class="landing-view__category-banner">
                    <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                </div>
                <div class="landing-view__category-banner">
                    <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                </div>
                <div class="landing-view__category-banner">
                    <img class="lazyload" data-src="https://via.placeholder.com/150x150" />
                </div>
            </div>

            <section class="section landing-view__products">
                <h2 class="landing-view____products-hl">585 покупателей на сайте сейчас выбирают</h2>
                <router-link class="landing-view__products-link" to="/">Смотреть все</router-link>

                <v-slider class="landing-view__products-slider" name="featured-products" :options="swiperOption">
                    <catalog-product-card
                        class="swiper-slide"
                        v-for="product in featuredProducts"
                        :key="product.id"
                        :product-id="product.id"
                        :name="product.name"
                        :href="product.href"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :tags="product.tags"
                        :rating="product.rating"
                    />
                </v-slider>
            </section>

            <div class="landing-view__brands-slider">
                Слайдер с брендами
            </div>

            <div class="landing-view__instagram">
                Панель с инстаграмом
            </div>
        </div>
    </section>
</template>

<script>
import { $store, $progress, $logger } from '../../services/ServiceLocator';

import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VSlider from '../../components/controls/VSlider/VSlider.vue';

import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';

import landingModule from '../../store/modules/Landing';
import { mapState } from 'vuex';

import '../../assets/images/sprites/arrow-small.svg';
import './Landing.css';

export default {
    name: 'landing',
    components: { VSvg, VSlider, CatalogProductCard },
    metaInfo: {
        title: 'landing',
        titleTemplate: '%s - Welcome!',
        htmlAttrs: {
            lang: 'ru',
        },
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 4,
                spaceBetween: 24,
                grabCursor: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
        };
    },

    computed: {
        ...mapState('landing', ['newProducts', 'bestsellerProducts', 'featuredProducts', 'categoryLinks']),
    },

    methods: {},

    beforeMount() {},

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const register = !!$store._modulesNamespaceMap[`${landingModule.name}/`];
        if (!register)
            $store.registerModule(landingModule.name, landingModule, {
                preserveState: !!$store.state.landing,
            });

        $progress.start();
        $store.dispatch(`${landingModule.name}/FETCH_LANDING_DATA`).then(() => next(vm => $progress.finish()));
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        this.$progress.start();
        this.$store.dispatch(`${landingModule.name}/FETCH_LANDING_DATA`).then(() => next(vm => $progress.finish()));
    },

    // Server-side only
    // This will be called by the server renderer automatically
    //serverPrefetch() {
    // return the Promise from the action
    // so that the component waits before rendering
    //},
};
</script>
