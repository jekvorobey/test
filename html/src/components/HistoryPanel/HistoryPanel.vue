<template>
    <div class="history-panel">
        <div v-if="!isTabletLg" class="history-panel__list">
            <recently-viewed-product-card
                class="history-panel__list-item"
                v-for="item in items"
                :key="item.id"
                :offer-id="item.id"
                :product-id="item.productId"
                :name="item.name"
                :href="item.url"
                :image="item.image"
            />
        </div>
        <v-slider v-else class="history-panel__slider" name="history" :options="sliderOptions">
            <recently-viewed-product-card
                class="swiper-slide"
                v-for="item in items"
                :key="item.id"
                :offer-id="item.id"
                :product-id="item.productId"
                :name="item.name"
                :href="item.url"
                :image="item.image"
            />
        </v-slider>
    </div>
</template>
<script>
import VSlider from '@controls/VSlider/VSlider.vue';
import RecentlyViewedProductCard from '@components/RecentlyViewedProductCard/RecentlyViewedProductCard.vue';

import { breakpoints } from '@enums';
import './HistoryPanel.css';

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
            slidesPerView: 3.5,
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
    name: 'history-panel',

    components: {
        VSlider,
        RecentlyViewedProductCard,
    },

    props: {
        items: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },

        sliderOptions() {
            return sliderOptions;
        },
    },
};
</script>