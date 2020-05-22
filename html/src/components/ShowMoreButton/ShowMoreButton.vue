<template>
    <v-button :class="btnClass" v-if="!showPreloader" v-on="handlers">
        <slot />
    </v-button>
    <img :src="preloaderIcon" class="preloader" :class="preloaderClass" width="30" height="30" v-else />
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import preloader from '@images/icons/preloader.svg';
import './ShowMoreButton.css';

export default {
    name: 'show-more-button',

    components: {
        VButton,
    },

    props: {
        showPreloader: {
            type: Boolean,
            default: false,
        },
        btnClass: {
            type: String,
            default: '',
        },
        preloaderClass: {
            type: String,
            default: '',
        },
    },

    computed: {
        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach(k => (handlers[k] = e => this.$emit(k, e)));
            handlers.click = this.onBtnClick;
            return handlers;
        },

        preloaderIcon() {
            return preloader;
        },
    },

    methods: {
        onBtnClick(e) {
            e.stopPropagation();
            this.$emit('click', e);
        },
    },
};
</script>
