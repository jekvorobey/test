<template>
    <section class="section">
        <div class="container instagram-section">
            <h2 class="instagram-section__hl">{{ titleText }}</h2>

            <v-slider v-if="isTabletLg" class="instagram-section__slider" name="instagram" :options="sliderOptions">
                <instagram-card
                    class="swiper-slide instagram-section__card"
                    v-for="item in items"
                    :key="item.id"
                    :instagram-card-id="item.id"
                    :image="item.image"
                />
            </v-slider>

            <v-button class="btn--outline instagram-section__link">
                {{ btnText }}
            </v-button>

            <div v-if="!isTabletLg" class="instagram-section__grid instagram-section__grid--initialized">
                <instagram-card
                    class="instagram-section__card"
                    v-for="item in items"
                    :key="item.id"
                    :instagram-card-id="item.id"
                    :image="item.image"
                />
            </div>
        </div>
    </section>
</template>

<script>
import VButton from '../../controls/VButton/VButton.vue';
import VSlider from '../../controls/VSlider/VSlider.vue';
import InstagramCard from '../../InstagramCard/InstagramCard.vue';

import { breakpoints } from '../../../assets/scripts/enums/general';
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