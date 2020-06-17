<template>
    <section class="section not-found-view">
        <div class="container not-found-view__main">
            <div class="not-found-view__main-body">
                <h1 class="not-found-view__hl">404</h1>
                <p>
                    К сожалению, неправильно набран адрес, или такой страницы больше не существует.
                </p>
                <div class="not-found-view__main-info">
                    <p>Если у вас возникли вопросы, обратитесь в службу поддержки:</p>
                    <p>
                        <a class="text-bold" href="tel:88007079070">8 800 707-90-70</a>
                        &nbsp;(звонок бесплатный)
                    </p>
                    Или напишите нам на почту <a href="mailto:support@ibt.studio">support@ibt.studio</a>
                </div>
                <v-button class="not-found-view__main-btn" to="/">На главную страницу</v-button>
            </div>
        </div>

        <section class="section not-found-view__featured" v-if="featuredProducts && featuredProducts.length > 0">
            <div class="container not-found-view__featured-container">
                <h2 class="not-found-view__section-hl not-found-view__featured-hl">{{ $t('cart.title.like') }}</h2>
                <v-slider class="not-found-view__featured-slider" name="404-featured" :options="sliderOptions">
                    <catalog-product-card
                        class="swiper-slide not-found-view__featured-card"
                        v-for="item in featuredProducts"
                        :key="item.id"
                        :offer-id="item.id"
                        :product-id="item.productId"
                        :type="item.type"
                        :name="item.name"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        @add-item="onAddToCart(item)"
                        @preview="onPreview(item.code)"
                        @toggle-favorite-item="onToggleFavorite(item)"
                    />
                </v-slider>
            </div>
        </section>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VSlider from '@controls/VSlider/VSlider.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FEATURED_MODULE, FEATURED_PRODUCTS } from '@store/modules/Featured';
import { FETCH_FEATURED_PRODUCTS } from '@store/modules/Featured/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { breakpoints, modalName } from '@enums';

import './NotFound.css';

const sliderOptions = {
    spaceBetween: 24,
    slidesPerView: 4,
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
        [breakpoints.tabletLg - 1]: {
            slidesPerView: 2.5,
            spaceBetween: 24,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },

        [breakpoints.tablet - 1]: {
            slidesPerView: 2,
            spaceBetween: 12,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        },
    },
};

export default {
    name: 'not-found',

    components: {
        VButton,
        VSlider,

        CatalogProductCard,
    },

    computed: {
        ...mapState(FEATURED_MODULE, [FEATURED_PRODUCTS]),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        sliderOptions() {
            return sliderOptions;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FEATURED_MODULE, [FETCH_FEATURED_PRODUCTS]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: modalName.general.QUICK_VIEW, open: true, state: { code } });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.ADD_TO_CART,
                open: true,
                state: { offerId: item.id, storeId: item.stock.storeId, type: item.type },
            });
        },
    },

    beforeMount() {
        this[FETCH_FEATURED_PRODUCTS]();
    },
};
</script>
