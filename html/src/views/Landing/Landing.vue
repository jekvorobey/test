<template>
    <section class="section landing-view">
        <section>
            <div class="container">
                <ul class="landing-view__categories">
                    <li :key="category.id" v-for="category in categories">
                        <router-link to="/">{{ category.name }}</router-link>
                    </li>
                </ul>
            </div>
        </section>
        <section class="section">
            <div class="container landing-view__banners">
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
                <div class="landing-view__banners-right">
                    <v-slider class="landing-view__banners-slider" name="banners" :options="bannersOptions">
                        <banner-card
                            class="swiper-slide landing-view__banners-card"
                            v-for="banner in sliderBanners"
                            :key="banner.id"
                            :banner-id="banner.id"
                            :title="banner.title"
                            :image="banner.image"
                        />
                    </v-slider>
                </div>
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__category-cards">
                <v-slider class="landing-view__category-slider" name="categories" :options="categoryOptions">
                    <category-card
                        class="swiper-slide landing-view__category-card"
                        v-for="category in categories"
                        :key="category.id"
                        :name="category.name"
                        :image="category.image"
                    />
                </v-slider>
            </div>
        </section>

        <section
            class="section landing-view__section"
            id="new"
            v-observe-visibility="{
                callback: onChangedVisibility,
                once: true,
            }"
        >
            <div class="container landing-view__products">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.new') }}</h2>
                <v-link class="landing-view__section-link" to="/">{{ $t('landing.showAll') }}</v-link>

                <v-slider
                    class="landing-view__products-slider"
                    name="new-products"
                    :options="productOptions"
                    :should-initialize="slidersVisibility.new"
                    @reachEnd="onEndReached('new')"
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
            </div>
        </section>

        <section
            class="section landing-view__section"
            id="bestseller"
            v-observe-visibility="{
                callback: onChangedVisibility,
                once: true,
            }"
        >
            <div class="container landing-view__products">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.bestseller') }}</h2>
                <v-link class="landing-view__section-link" to="/">{{ $t('landing.showAll') }}</v-link>

                <v-slider
                    v-if="slidersVisibility.bestseller"
                    class="landing-view__products-slider"
                    name="bestseller-products"
                    :options="productOptions"
                    @reachEnd="onEndReached('bestseller')"
                >
                    <catalog-product-card
                        class="swiper-slide landing-view__products-card"
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
            </div>
        </section>

        <section class="section landing-view__section">
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
            id="featured"
            v-observe-visibility="{
                callback: onChangedVisibility,
                once: true,
            }"
        >
            <div class="container landing-view__products">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.featured', { n: 585 }) }}</h2>
                <v-link class="landing-view__section-link" to="/">{{ $t('landing.showAll') }}</v-link>

                <v-slider
                    v-if="slidersVisibility.featured"
                    class="landing-view__products-slider"
                    name="featured-products"
                    :options="productOptions"
                    @reachEnd="onEndReached('featured')"
                >
                    <catalog-product-card
                        class="swiper-slide landing-view__products-card"
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
                <v-link class="landing-view__section-link" to="/">{{ $t('landing.showAll') }}</v-link>

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

                <div v-else-if="!isTabletLg && slidersVisibility.instagram" class="landing-view__instagram-grid">
                    <instagram-card
                        class="landing-view__instagram-card"
                        v-for="item in instagramItems"
                        :key="item.id"
                        :instagram-card-id="item.id"
                        :image="item.image"
                    />
                </div>
            </div>
        </section>
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
import { breakpoints } from '../../constants';

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
        ...mapState('landing', ['categories', 'brands', 'instagramItems']),

        ...mapState('landing', {
            mainBanners: state => state.banners.mainBanners,
            sliderBanners: state => state.banners.sliderBanners,
            middleBanners: state => state.banners.middleBanners,

            bestsellerLength: state => state.bestsellerProducts.length,
            featuredLength: state => state.featuredProducts.length,
            newLength: state => state.newProducts.length,

            bestsellerProducts(state) {
                return state.bestsellerProducts.slice(0, this.sliderSize.bestseller);
            },
            featuredProducts(state) {
                return state.featuredProducts.slice(0, this.sliderSize.featured);
            },
            newProducts(state) {
                return state.newProducts.slice(0, this.sliderSize.new);
            },
        }),

        categoryOptions() {
            return categoryOptions;
        },

        bannersOptions() {
            return bannersOptions;
        },

        productOptions() {
            return productOptions;
        },

        brandsOptions() {
            return brandsOptions;
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
