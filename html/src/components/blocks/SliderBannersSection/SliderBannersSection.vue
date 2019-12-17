<template>
    <section class="section">
        <div class="container slider-banners-section">
            <v-slider class="slider-banners-section__slider" name="banners" :options="sliderOptions">
                <landing-banner-card
                    v-for="banner in computedBanners"
                    class="swiper-slide slider-banners-section__card"
                    :key="banner.id"
                    :banner-id="banner.id"
                    :image="banner.image"
                    :upper-text="banner.upperText"
                    :bottom-text="banner.bottomText"
                    :title="banner.title"
                    :btn-text="banner.btnText"
                />
            </v-slider>
        </div>
    </section>
</template>

<script>
import VPicture from '../../controls/VPicture/VPicture.vue';
import VSlider from '../../../components/controls/VSlider/VSlider.vue';
import LandingBannerCard from '../../LandingBannerCard/LandingBannerCard.vue';

import './SliderBannersSection.css';

const sliderOptions = {
    slidesPerView: 1,
    // grabCursor: true,
    // loop: true,
    // autoplay: {
    //     delay: 10000,
    // },

    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },

    // pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    // },
};

export default {
    name: 'slider-banners-section',

    components: {
        VPicture,
        VSlider,
        LandingBannerCard,
    },

    props: {
        banners: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    computed: {
        sliderOptions() {
            return sliderOptions;
        },

        computedBanners() {
            return this.banners.slice(0, 1);
        },
    },
};
</script>
