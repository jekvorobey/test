<template>
    <self-router-link class="link" v-if="to" :to="to" :exact="exact" :same-disabled="sameDisabled" v-on="handlers">
        <slot />
    </self-router-link>
    <a class="link" v-else-if="tag === 'a'" v-on="handlers">
        <slot />
    </a>
    <button class="link" v-else :type="type" v-on="handlers">
        <slot />
    </button>
</template>

<script>
import SelfRouterLink from './SelfRouterLink.vue';

import './VLink.critical.css';
import './VLink.css';

const validTags = ['a', 'button'];

/**
 * Базовый класс для линка, поддерживает SVG
 */
export default {
    name: 'v-link',

    components: {
        SelfRouterLink,
    },

    props: {
        type: {
            type: String,
            default: 'button',
        },

        tag: {
            type: String,
            default: 'a',
            validator(value) {
                return validTags.indexOf(value) !== -1;
            },
        },

        to: {
            type: [String, Object],
        },

        exact: {
            type: Boolean,
            default: false,
        },

        sameDisabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => (handlers[k] = (e) => this.$emit(k, e)));
            return handlers;
        },
    },
};
</script>
