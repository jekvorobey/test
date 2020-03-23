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
                        <a class="text-bold" href="tel:88007301243">8 800 730-12-43</a>
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
                        :product-id="item.id"
                        :type="item.type"
                        :name="item.name"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        @addItem="onAddToCart(item)"
                        @preview="onPreview(item.code)"
                    />
                </v-slider>
            </div>
        </section>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VSlider from '@controls/VSlider/VSlider.vue';

import { NAME as QUICK_VIEW_MODAL_NAME } from '@components/QuickViewModal/QuickViewModal.vue';
import { NAME as ADD_TO_CART_MODAL_NAME } from '@components/AddToCartModal/AddToCartModal.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FEATURED_MODULE, FEATURED_PRODUCTS } from '@store/modules/Featured';
import { FETCH_FEATURED_PRODUCTS } from '@store/modules/Featured/actions';

import { breakpoints } from '@enums';

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
        ...mapState(MODAL_MODULE, {
            isQuickViewOpen: state => state[MODALS][QUICK_VIEW_MODAL_NAME] && state[MODALS][QUICK_VIEW_MODAL_NAME].open,
            isAddToCartOpen: state =>
                state[MODALS][ADD_TO_CART_MODAL_NAME] && state[MODALS][ADD_TO_CART_MODAL_NAME].open,
        }),
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

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: QUICK_VIEW_MODAL_NAME, open: true, state: { code } });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: ADD_TO_CART_MODAL_NAME,
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
