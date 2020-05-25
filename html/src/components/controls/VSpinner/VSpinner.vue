<template>
    <transition name="fade-in">
        <img class="v-spinner" v-show="show" :style="style" :src="icon" :width="width" :height="height" />
    </transition>
</template>

<script>
import preloader from '@images/icons/preloader.svg';
import './VSpinner.css';

export default {
    name: 'v-spinner',
    props: {
        show: {
            type: Boolean,
        },

        width: {
            type: [String, Number],
            default: 44,
        },

        height: {
            type: [String, Number],
            default: 44,
        },
    },

    computed: {
        icon() {
            return preloader;
        },

        style() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
            };
        },
    },

    serverCacheKey: props => `${props.show}-${props.width}-${props.height}`,
};
</script>
