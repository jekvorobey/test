<template>
    <section class="section landing-view">
        <section class="section">
            <div class="container landing-view__banners">
                <v-slider class="landing-view__banners-slider" name="banners" :options="bannersOptions">
                    <div class="swiper-slide landing-view__banners-card" v-for="banner in banners" :key="banner.id">
                        <img class="blur-up lazyload landing-view__banners-card-img" :data-src="banner.image" alt />
                    </div>
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
                        :code="category.code"
                    />
                </div>
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__products ">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.new') }}</h2>

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
                        <v-button class="btn--outline landing-view__section-link" to="/">
                            {{ $t('landing.showAll') }}
                        </v-button>
                    </div>

                    <catalog-banner-card
                        class="landing-view__products-banner"
                        :banner-id="newProducts.banner.id"
                        :btn-text="newProducts.banner.btnText"
                        :title="newProducts.banner.title"
                        :upper-text="newProducts.banner.upperText"
                        :image="newProducts.banner.image"
                    />
                </div>
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__products landing-view__products--inverse">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.bestseller') }}</h2>

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
                        <v-button class="btn--outline landing-view__section-link" to="/">
                            {{ $t('landing.showAll') }}
                        </v-button>
                    </div>

                    <catalog-banner-card
                        class="landing-view__products-banner"
                        :banner-id="bestsellerProducts.banner.id"
                        :btn-text="bestsellerProducts.banner.btnText"
                        :title="bestsellerProducts.banner.title"
                        :upper-text="bestsellerProducts.banner.upperText"
                        :image="bestsellerProducts.banner.image"
                    />
                </div>
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__middle-banners">
                <div class="landing-view__middle-banners-grid">
                    <banner-card
                        class="landing-view__middle-banners-card"
                        v-for="banner in middleBanners"
                        :key="banner.id"
                        :image="banner.image"
                        :title="banner.title"
                        :button-text="banner.btnText"
                    />
                </div>
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__products">
                <h2 class="landing-view__section-hl">{{ $t('landing.title.featured') }}</h2>

                <div class="landing-view__products-grid">
                    <div class="landing-view__products-cards">
                        <catalog-product-card
                            class="landing-view__products-card"
                            v-for="product in featuredProducts.items"
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
                        <v-button class="btn--outline landing-view__section-link" to="/">
                            {{ $t('landing.showAll') }}
                        </v-button>
                    </div>
                    <catalog-banner-card
                        class="landing-view__products-banner"
                        :banner-id="featuredProducts.banner.id"
                        :btn-text="featuredProducts.banner.btnText"
                        :title="featuredProducts.banner.title"
                        :upper-text="featuredProducts.banner.upperText"
                        :image="featuredProducts.banner.image"
                    />
                </div>
            </div>
        </section>

        <section class="section landing-view__section landing-view__section--grey">
            <div class="container landing-view__brands">
                <h2 class="landing-view__section-hl landing-view__brands-hl">
                    {{ $t('landing.title.brand') }}
                </h2>
                <popular-brands
                    class="landing-view__brands-list"
                    :items="brands"
                    :rest-count="10"
                    :btn-text="$t('landing.brands.showAll')"
                />
            </div>
        </section>

        <section class="section landing-view__section">
            <div class="container landing-view__instagram">
                <h2 class="landing-view__section-hl landing-view__instagram-hl">{{ $t('landing.title.instagram') }}</h2>

                <v-slider
                    v-if="isTabletLg"
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

                <v-button class="btn--outline landing-view__section-link landing-view__instagram-link">
                    {{ $t('landing.subscribe') }}
                </v-button>

                <div
                    v-if="!isTabletLg"
                    class="landing-view__instagram-grid"
                    :class="{ 'landing-view__instagram-grid--initialized': true }"
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
        </section>
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
import CatalogBannerCard from '../../components/CatalogBannerCard/CatalogBannerCard.vue';
import PopularBrands from '../../components/PopularBrands/PopularBrands.vue';

import { mapState } from 'vuex';
import landingModule from '../../store/modules/Landing';
import { $store, $progress, $logger } from '../../services/ServiceLocator';
import { breakpoints } from '../../assets/scripts/constants';

import '../../plugins/observer';
import '../../assets/images/sprites/socials/instagram-bw.svg';
import '../../assets/images/sprites/arrow-small.svg';
import './Landing.css';

const bannersOptions = {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 10000,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
};

const instagramOptions = {
    spaceBetween: 24,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    slidesPerView: 2.5,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    breakpoints: {
        [breakpoints.tablet - 1]: {
            slidesPerView: 1.5,
            spaceBetween: 16,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
        },
    },
};

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
        CatalogBannerCard,

        PopularBrands,
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
            'middleBanners',
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
