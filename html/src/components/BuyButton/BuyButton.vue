<template>
    <v-button :disabled="disabled" :loading="loading" v-on="handlers">
        <slot />
    </v-button>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

export default {
    name: 'buy-button',

    components: {
        VButton,
    },

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: false,
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
            e.preventDefault();
            e.stopPropagation();

            this.$emit('click', e);
        },
    },
};
</script>
