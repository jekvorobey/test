<template>
    <v-button :class="btnClass" v-if="!showPreloader" v-on="handlers">
        <slot />
    </v-button>
    <div v-else :class="preloaderClass">
        <v-spinner class="preloader" width="30" height="30" show />
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';
import './ShowMoreButton.css';

export default {
    name: 'show-more-button',

    components: {
        VButton,
        VSpinner,
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
            keys.forEach((k) => (handlers[k] = (e) => this.$emit(k, e)));
            handlers.click = this.onBtnClick;
            return handlers;
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
