<template>
    <v-link tag="button" v-on="handlers">
        <template v-if="isSmall">
            <v-svg name="wishlist-small-full" width="16" height="16" v-if="isActive" />
            <v-svg name="wishlist-small" width="16" height="16" v-else />
        </template>
        <template v-else>
            <v-svg name="wishlist-full" width="24" height="24" v-if="isActive" />
            <v-svg name="wishlist-middle" width="24" height="24" v-else />
        </template>

        <slot />
    </v-link>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/wishlist-full.svg';
import '@images/sprites/wishlist-small.svg';
import '@images/sprites/wishlist-small-full.svg';
import './FavoritesButton.css';

export default {
    name: 'favorites-button',

    components: {
        VLink,
        VSvg,
    },

    props: {
        isActive: {
            type: Boolean,
            default: false,
        },

        isSmall: {
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
            e.stopPropagation();
            e.preventDefault();
            this.$emit('click', e);
        },
    },
};
</script>
