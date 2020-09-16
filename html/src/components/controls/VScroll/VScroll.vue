<template>
    <vuescroll class="v-scroll">
        <div slot="scroll-panel" data-id="container" v-scroll-lock="scrollLock" />
        <div slot="scroll-content" data-id="container">
            <slot />
        </div>
    </vuescroll>
</template>

<script>
import Vuescroll from 'vuescroll';
import './VScroll.css';

export default {
    name: 'v-scroll',

    components: {
        Vuescroll,
    },

    props: {
        scrollLock: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
