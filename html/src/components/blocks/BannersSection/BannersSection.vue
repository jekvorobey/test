<template>
    <section class="section">
        <div class="container banners-section">
            <v-slider class="banners-section__slider" name="banners" :options="sliderOptions">
                <div class="swiper-slide banners-section__card" v-for="banner in banners" :key="banner.id">
                    <img class="blur-up lazyload banners-section__card-img" :data-src="banner.image" alt />
                </div>
            </v-slider>
        </div>
    </section>
</template>

<script>
import VSlider from '../../../components/controls/VSlider/VSlider.vue';
import './BannersSection.css';

const sliderOptions = {
    slidesPerView: 1,
    grabCursor: true,
    // loop: true,
    // autoplay: {
    //     delay: 10000,
    // },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
};

export default {
    name: 'banners-section',

    components: {
        VSlider,
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
    },
};
</script>