<template>
    <div class="v-slider" v-swiper:slider="options">
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

        shouldInitialize: {
            type: Boolean,
            default: true,
        },
    },

    watch: {
        shouldInitialize(value) {
            if (value && !this.initialized) this.slider.init();
        },
    },

    methods: {
        onEndReached() {
            this.$emit('reachEnd');
        },
    },

    mounted() {
        if (this.slider) {
            this.slider.on('reachEnd', this.onEndReached);
            if (this.shouldInitialize) this.slider.init();
        }
    },

    beforeDestroy() {
        if (this.slider) {
            this.slider.destroy(true, false);
            this.slider = null;
        }
    },
};
</script>
