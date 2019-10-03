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
    props: {
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    serverCacheKey: props => props.name,
};
</script>
