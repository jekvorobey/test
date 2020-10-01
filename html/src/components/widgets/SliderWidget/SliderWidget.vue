<template>
    <v-slider class="slider-widget" name="slider" :options="sliderOptions">
        <component
            class="swiper-slide"
            v-for="child in children"
            :key="child.id"
            :is="child.component"
            v-bind="child.data"
        />
    </v-slider>
</template>

<script>
import VSlider from '@controls/VSlider/VSlider.vue';
import './SliderWidget.css';

const sliderOptions = {
    slidesPerView: 1,
    grabCursor: true,

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
    name: 'slider-widget',

    components: {
        VSlider,
    },

    props: {
        children: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        sliderOptions() {
            return sliderOptions;
        },
    },
};
</script>
