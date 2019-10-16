<template>
    <section class="section landing-view">
        <section class="section">
            <div class="container landing-view__banners">
                <v-slider class="landing-view__banners-slider" name="banners" :options="bannersOptions">
                    <banner-card
                        class="swiper-slide landing-view__banners-card"
                        v-for="banner in banners"
                        :key="banner.id"
                        :banner-id="banner.id"
                        :title="banner.title"
                        :image="banner.image"
                    />
                </v-slider>
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__categories">
                <div class="landing-view__categories-grid">
                    <category-card
                        class="landing-view__categories-card"
                        v-for="category in categories"
                        :key="category.id"
                        :name="category.name"
                        :image="category.image"
                    />
                </div>
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__products ">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.new') }}</h2>
                <v-button class="btn--outline landing-view__section-link" to="/">{{ $t('landing.showAll') }}</v-button>
                <div class="landing-view__products-grid">
                    <div class="landing-view__products-cards">
                        <catalog-product-card
                            class="landing-view__products-card"
                            v-for="product in newProducts.items"
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
                    </div>

                    <div class="landing-view__products-banner">
                        <img
                            class="lazyload blur-up landing-view__products-banner-img"
                            :data-src="newProducts.banner.image"
                        />
                        <div class="landing-view__products-banner-panel">
                            <div class="landing-view__products-banner-panel-title">
                                {{ newProducts.banner.title }}
                            </div>
                            <v-button class="btn--outline landing-view__products-banner-panel-btn">
                                {{ newProducts.banner.btnText }}
                            </v-button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__products landing-view__products--inverse">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.bestseller') }}</h2>
                <v-button class="btn--outline landing-view__section-link" to="/">{{ $t('landing.showAll') }}</v-button>
                <div class="landing-view__products-grid">
                    <div class="landing-view__products-cards">
                        <catalog-product-card
                            class="landing-view__products-card"
                            v-for="product in bestsellerProducts.items"
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
                    </div>

                    <div class="landing-view__products-banner">
                        <img
                            class="lazyload blur-up landing-view__products-banner-img"
                            :data-src="bestsellerProducts.banner.image"
                        />
                        <div class="landing-view__products-banner-panel">
                            <div class="landing-view__products-banner-panel-title">
                                {{ bestsellerProducts.banner.title }}
                            </div>
                            <v-button class="btn--outline landing-view__products-banner-panel-btn">
                                {{ bestsellerProducts.banner.btnText }}
                            </v-button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- <section class="section landing-view__section">
            <div class="container landing-view__middle-banners">
                <banner-card
                    class="landing-view__middle-banners-card"
                    v-for="banner in middleBanners"
                    :key="banner.id"
                    :image="banner.image"
                    :title="banner.title"
                />
            </div>
        </section>

        <section
            class="section landing-view__section"
            id="brands"
            v-observe-visibility="{
                callback: onChangedVisibility,
                once: true,
            }"
        >
            <div class="container landing-view__brands">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.brand') }}</h2>
                <v-button class="landing-view__section-link" to="/">{{ $t('landing.showAll') }}</v-button>

                <v-slider
                    v-if="slidersVisibility.brands"
                    class="landing-view__brands-slider"
                    name="popular-brands"
                    :options="brandsOptions"
                >
                    <brand-card
                        class="swiper-slide landing-view__brands-card"
                        v-for="brand in brands"
                        :key="brand.id"
                        :brand-id="brand.id"
                        :image="brand.image"
                    />
                </v-slider>
            </div>
        </section>

        <section
            class="section landing-view__section"
            id="instagram"
            v-observe-visibility="{
                callback: onChangedVisibility,
                once: true,
            }"
        >
            <div class="container landing-view__instagram">
                <h2 class="landing-view__instagram-hl">{{ $t('landing.title.instagram') }}</h2>
                <a class="landing-view__instagram-link" href="/">
                    <v-svg name="instagram-bw" width="22" height="22" />&nbsp;&nbsp;{{ $t('landing.subscribe') }}
                </a>

                <v-slider
                    v-if="isTabletLg && slidersVisibility.instagram"
                    class="landing-view__instagram-slider"
                    name="instagram"
                    :options="instagramOptions"
                >
                    <instagram-card
                        class="swiper-slide landing-view__instagram-card"
                        v-for="item in instagramItems"
                        :key="item.id"
                        :instagram-card-id="item.id"
                        :image="item.image"
                    />
                </v-slider>

                <div
                    v-else-if="!isTabletLg && slidersVisibility.instagram"
                    class="landing-view__instagram-grid"
                    :class="{ 'landing-view__instagram-grid--initialized': slidersVisibility.instagram }"
                >
                    <instagram-card
                        class="landing-view__instagram-card"
                        v-for="item in instagramItems"
                        :key="item.id"
                        :instagram-card-id="item.id"
                        :image="item.image"
                    />
                </div>
            </div>
        </section> -->
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VSlider from '../../components/controls/VSlider/VSlider.vue';

import BrandCard from '../../components/BrandCard/BrandCard.vue';
import BannerCard from '../../components/BannerCard/BannerCard.vue';
import CategoryCard from '../../components/CategoryCard/CategoryCard.vue';
import InstagramCard from '../../components/InstagramCard/InstagramCard.vue';
import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';

import landingModule from '../../store/modules/Landing';
import { $store, $progress, $logger } from '../../services/ServiceLocator';
import { mapState } from 'vuex';
import { breakpoints } from '../../assets/scripts/constants';

import '../../plugins/observer';
import '../../assets/images/sprites/socials/instagram-bw.svg';
import '../../assets/images/sprites/arrow-small.svg';
import './Landing.css';

const tablet = breakpoints.tablet - 1;
const tabletLg = breakpoints.tabletLg - 1;

const bannersOptions = {
    init: false,
    slidesPerView: 1,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
};

const categoryOptions = {
    init: false,
    slidesPerView: 6,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        [tabletLg]: {
            slidesPerView: 4,
            spaceBetween: 24,
        },

        [tablet]: {
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
            slidesPerView: 3,
            spaceBetween: 16,
        },
    },
};

const brandsOptions = {
    init: false,
    slidesPerView: 6,
    spaceBetween: 64,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        [tabletLg]: {
            slidesPerView: 4,
            spaceBetween: 24,
        },

        [tablet]: {
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
            slidesPerView: 2.5,
            spaceBetween: 30,
        },
    },
};

const instagramOptions = {
    init: false,
    slidesPerView: 1.5,
    spaceBetween: 24,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        [tablet]: {
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
            slidesPerView: 1.5,
        },
    },
};

const productOptions = {
    init: false,
    slidesPerView: 4,
    spaceBetween: 24,
    grabCursor: true,
    roundLengths: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        [tablet]: {
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
            slidesPerView: 2.3,
        },
    },
};

const productsSize = 6;

export default {
    name: 'landing',

    components: {
        VSvg,
        VButton,
        VSlider,

        BrandCard,
        BannerCard,
        CategoryCard,
        InstagramCard,
        CatalogProductCard,
    },

    head: {
        title: {
            inner: 'landing',
            separator: '-',
            complement: ' Welcome!',
        },
    },

    data() {
        return {
            slidersVisibility: {
                instagram: false,
                brands: false,
                featured: false,
                bestseller: false,
                new: false,
            },

            sliderSize: {
                featured: productsSize,
                bestseller: productsSize,
                new: productsSize,
            },
        };
    },

    computed: {
        ...mapState('landing', [
            'categories',
            'brands',
            'instagramItems',
            'bestsellerProducts',
            'featuredProducts',
            'newProducts',
            'banners',
        ]),

        bannersOptions() {
            return bannersOptions;
        },

        instagramOptions() {
            return instagramOptions;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        onEndReached(id) {
            if (this.sliderSize[id] < this[`${id}Length`]) this.sliderSize[id] += productsSize;
        },

        onChangedVisibility(isVisible, { target }) {
            if (isVisible && this.slidersVisibility[target.id] !== isVisible)
                this.slidersVisibility[target.id] = isVisible;
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const register = !!$store._modulesNamespaceMap[`${landingModule.name}/`];
        if (!register)
            $store.registerModule(landingModule.name, landingModule, {
                preserveState: !!$store.state.landing,
            });

        if ($store.state.landing.load) {
            next();
        } else {
            $progress.start();
            $store.dispatch(`${landingModule.name}/FETCH_LANDING_DATA`).then(() => next(vm => $progress.finish()));
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        this.$progress.start();
        this.$store
            .dispatch(`${landingModule.name}/FETCH_LANDING_DATA`)
            .then(() => next(vm => this.$progress.finish()));
    },

    // Server-side only
    // This will be called by the server renderer automatically
    //serverPrefetch() {
    // return the Promise from the action
    // so that the component waits before rendering
    //},
};
</script>
