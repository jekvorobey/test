<template>
    <section class="section product-view__section product-view__like">
        <div class="container product-view__like-container">
            <h2 class="product-view__section-hl product-view__like-hl">{{ $t('product.title.like') }}</h2>
            <v-slider class="product-view__like-slider" name="also-like" :options="sliderOptions">
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
                    :badges="item.badges"
                    :rating="item.rating"
                    :show-buy-btn="item.stock.qty > 0"
                    @add-item="onAddToCart(item)"
                    @preview="onPreview(item.code)"
                    @toggle-favorite-item="onToggleFavorite(item)"
                />
            </v-slider>
        </div>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VSlider from '@controls/VSlider/VSlider.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FEATURED_MODULE, FEATURED_PRODUCTS } from '@store/modules/Featured';
import { FETCH_FEATURED_PRODUCTS } from '@store/modules/Featured/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import metaMixin from '@plugins/meta';
import { breakpoints, modalName } from '@enums';

const sliderOptions = {
    spaceBetween: 24,
    slidesPerView: 4,
    grabCursor: true,
    autoHeight: true,

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
    name: 'featured-products',
    components: {
        VButton,
        VSlider,

        CatalogProductCard,
    },
    mixins: [metaMixin],
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

        onAddToCart(item) {
            const { code, type, stock, id, variantGroups } = item;

            if (variantGroups) this.onPreview(code);
            else
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.ADD_TO_CART,
                    open: true,
                    state: { offerId: id, storeId: stock && stock.storeId, type },
                });
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.QUICK_VIEW,
                open: true,
                state: { code },
            });
        },
    },

    beforeMount() {
        this[FETCH_FEATURED_PRODUCTS]();
    },
};
</script>
