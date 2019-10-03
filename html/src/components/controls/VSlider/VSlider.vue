<template>
    <transition name="fade-in" appear>
        <div v-show="show" class="v-slider" v-swiper:slider="options">
            <div class="swiper-wrapper">
                <slot />
            </div>
            <button class="swiper-button-prev">
                <v-svg name="arrow-small" width="24" height="24" />
            </button>
            <button class="swiper-button-next">
                <v-svg name="arrow-small" width="24" height="24" />
            </button>
        </div>
    </transition>
</template>

<script>
import VSvg from '../VSvg/VSvg.vue';

import '../../../plugins/swiper';
import 'swiper/dist/css/swiper.css';
import './VSlider.css';

export default {
    name: 'v-slider',
    components: {
        VSvg,
    },

    serverCacheKey: props => props.name,

    props: {
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Object,
            default() {
                return {
                    init: false,
                    grabCursor: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                };
            },
        },
    },

    data() {
        return {
            show: false,
        };
    },

    methods: {
        initialized() {
            this.show = true;
        },
    },

    mounted() {
        this.slider.on('init', this.initialized);
        this.slider.init();
    },

    beforeDestroy() {
        this.slider.clearEvents();
        this.slider.destroy();
    },
};
</script>
