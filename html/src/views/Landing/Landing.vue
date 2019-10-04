<template>
    <section class="section landing-view">
        <div class="container">
            <ul class="landing-view__categories">
                <li :key="category.id" v-for="category in categories">
                    <router-link to="/">{{ category.name }}</router-link>
                </li>
            </ul>

            <section class="landing-view__banners">
                <div class="landing-view__banners-left">
                    <banner-card
                        class="landing-view__banners-card"
                        v-for="banner in mainBanners"
                        :key="banner.id"
                        :banner-id="banner.id"
                        :title="banner.title"
                        :image="banner.image"
                    />
                </div>
                <div class="landing-view__banners-right">слайдер с баннерами</div>
            </section>

            <section class="section landing-view__category-cards">
                <v-slider class="landing-view__category-slider" name="categories" :options="categoryOptions">
                    <category-card
                        class="swiper-slide landing-view__category-card"
                        v-for="category in categories"
                        :key="category.id"
                        :name="category.name"
                        :image="category.image"
                    />
                </v-slider>
            </section>

            <section class="section landing-view__products" id="new" v-observe-visibility="onChangedVisibility">
                <h2 class="landing-view__products-hl">Новинки</h2>
                <router-link class="landing-view__products-link" to="/">Смотреть все</router-link>

                <v-slider
                    class="landing-view__products-slider"
                    name="new-products"
                    :options="productOptions"
                    :should-initialize="slidersVisibility.new"
                >
                    <catalog-product-card
                        class="swiper-slide landing-view__products-card"
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

            <section class="section landing-view__products" id="bestsellers" v-observe-visibility="onChangedVisibility">
                <h2 class="landing-view__products-hl">Бестселлеры</h2>
                <router-link class="landing-view__products-link" to="/">Смотреть все</router-link>

                <v-slider
                    class="landing-view__products-slider"
                    name="bestseller-products"
                    :options="productOptions"
                    :should-initialize="slidersVisibility.bestsellers"
                >
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

            <section class="landing-view__middle-banners">
                <banner-card
                    class="landing-view__middle-banners-card"
                    v-for="banner in middleBanners"
                    :key="banner.id"
                    :image="banner.image"
                    :title="banner.title"
                />
            </section>

            <section class="section landing-view__products" id="featured" v-observe-visibility="onChangedVisibility">
                <h2 class="landing-view__products-hl">585 покупателей на сайте сейчас выбирают</h2>
                <router-link class="landing-view__products-link" to="/">Смотреть все</router-link>

                <v-slider
                    class="landing-view__products-slider"
                    name="featured-products"
                    :options="productOptions"
                    :should-initialize="slidersVisibility.featured"
                >
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

            <section class="section landing-view__brands" id="brands" v-observe-visibility="onChangedVisibility">
                <h2 class="landing-view__brands-hl">Популярные бренды</h2>
                <router-link class="landing-view__brands-link" to="/">Смотреть все</router-link>

                <v-slider
                    class="landing-view__brands-slider"
                    name="popular-brands"
                    :options="brandsOptions"
                    :should-initialize="slidersVisibility.brands"
                >
                    <brand-card
                        class="swiper-slide landing-view__brands-card"
                        v-for="brand in brands"
                        :key="brand.id"
                        :brand-id="brand.id"
                        :image="brand.image"
                    />
                </v-slider>
            </section>

            <section class="landing-view__instagram">
                <h2 class="landing-view__instagram-hl">Insta Beauty</h2>
                <a class="landing-view__instagram-link" href="/">
                    <v-svg name="instagram-bw" width="22" height="22" />&nbsp;&nbsp;Подписаться на нас
                </a>
                <div class="landing-view__instagram-grid">
                    <instagram-card
                        v-for="item in instagramItems"
                        :key="item.id"
                        :instagram-card-id="item.id"
                        :image="item.image"
                    />
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import { $store, $progress, $logger } from '../../services/ServiceLocator';

import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VLink from '../../components/controls/VLink/VLink.vue';
import VSlider from '../../components/controls/VSlider/VSlider.vue';

import BrandCard from '../../components/BrandCard/BrandCard.vue';
import BannerCard from '../../components/BannerCard/BannerCard.vue';
import CategoryCard from '../../components/CategoryCard/CategoryCard.vue';
import InstagramCard from '../../components/InstagramCard/InstagramCard.vue';
import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';

import landingModule from '../../store/modules/Landing';
import { mapState } from 'vuex';

import '../../plugins/observer';
import '../../assets/images/sprites/socials/instagram-bw.svg';
import '../../assets/images/sprites/arrow-small.svg';
import './Landing.css';

export default {
    name: 'landing',

    components: {
        VSvg,
        VLink,
        VSlider,
        BrandCard,
        BannerCard,
        CategoryCard,
        InstagramCard,
        CatalogProductCard,
    },

    metaInfo: {
        title: 'landing',
        titleTemplate: '%s - Welcome!',
        htmlAttrs: {
            lang: 'ru',
        },
    },

    data() {
        return {
            slidersVisibility: {
                brands: false,
                featured: false,
                bestsellers: false,
                new: false,
            },

            brandsOptions: {
                init: false,
                slidesPerView: 6,
                slidesOffsetBefore: 24,
                slidesOffsetAfter: 24,
                grabCursor: true,

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },

            categoryOptions: {
                init: false,
                slidesPerView: 6,
                spaceBetween: 24,
                grabCursor: true,

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },

            productOptions: {
                init: false,
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
        ...mapState('landing', [
            'newProducts',
            'bestsellerProducts',
            'featuredProducts',
            'categories',
            'banners',
            'brands',
            'instagramItems',
        ]),
        ...mapState('landing', {
            mainBanners: state => state.banners.mainBanners,
            middleBanners: state => state.banners.middleBanners,
        }),
    },

    methods: {
        onChangedVisibility(isVisible, { target }) {
            if (isVisible && this.slidersVisibility[target.id] !== isVisible)
                this.slidersVisibility[target.id] = isVisible;
        },
    },

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
