<template>
    <section class="section">
        <div class="container instagram-section">
            <div id="frisbuy-widget2" />
        </div>
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import InstagramCard from '@components/InstagramCard/InstagramCard.vue';

import { breakpoints } from '@enums';
import './InstagramSection.css';

const sliderOptions = {
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
    name: 'instagram-section',

    components: {
        VButton,
        VSlider,
        InstagramCard,
    },

    props: {
        titleText: {
            type: String,
            default: 'Title',
        },

        items: {
            type: Array,
        },

        btnText: {
            type: String,
        },

        btnLink: {
            type: String,
        },
    },

    computed: {
        sliderOptions() {
            return sliderOptions;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
};
</script>
