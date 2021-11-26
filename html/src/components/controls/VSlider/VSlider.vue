<template>
    <div class="v-slider" :class="{ 'v-slider--disabled': !controls }" v-swiper:slider="sliderOptions">
        <div class="swiper-wrapper">
            <slot />
        </div>

        <div class="v-slider__controls" v-if="controls">
            <button class="swiper-button-prev">
                <v-svg name="arrow-small" width="24" height="24" />
            </button>
            <div class="swiper-pagination" />
            <button class="swiper-button-next">
                <v-svg name="arrow-small" width="24" height="24" />
            </button>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/arrow-small.svg';
import '@plugins/swiper';
import 'swiper/dist/css/swiper.css';
import './VSlider.css';

export default {
    name: 'v-slider',
    components: {
        VSvg,
    },

    serverCacheKey: (props) => props.name,

    props: {
        value: {
            type: Number,
            default: 0,
        },

        name: {
            type: String,
            required: true,
        },

        options: {
            type: Object,

            validator(value) {
                if (typeof value !== 'object' || Array.isArray(value) || value === null) {
                    return false;
                }

                if (typeof value.initialSlide !== 'undefined') {
                    console.error(`[V-Slider]: 'initialSlider' option is not supported. Please, use v-model instead`);
                }

                return true;
            },

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

        controls: {
            type: Boolean,
            default: true,
        },
    },

    watch: {
        shouldInitialize(value) {
            if (value && !this.initialized) this.slider.init();
        },

        value(index) {
            if (this.slider.realIndex !== index) {
                this.slider.slideTo(index);
            }
        },
    },

    computed: {
        sliderOptions() {
            return {
                ...this.options,
                initialSlide: this.value,
            };
        },
    },

    methods: {
        onEndReached() {
            this.$emit('reachEnd');
        },
    },

    mounted() {
        if (this.slider) {
            this.slider.on('activeIndexChange', () => {
                this.$emit('input', this.slider.realIndex);
            });

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
