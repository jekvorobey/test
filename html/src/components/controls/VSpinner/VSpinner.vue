<template>
    <transition>
        <svg
            class="v-spinner"
            :class="{ show: show }"
            v-show="show"
            :width="width"
            :height="height"
            viewBox="0 0 44 44"
        >
            <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
        </svg>
    </transition>
</template>

<script>
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
    serverCacheKey: props => `${props.show}-${props.width}-${props.height}`,
};
</script>
