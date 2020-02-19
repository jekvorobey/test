<template>
    <router-link class="link" v-if="to" :to="to" :tag="tag" v-on="handlers" :exact="exact">
        <v-svg v-if="iconName && placement === 'before'" :name="iconName" :modifier="iconModifier" />
        <slot />
        <v-svg v-if="iconName && placement === 'after'" :name="iconName" :modifier="iconModifier" />
    </router-link>
    <a class="link" v-else-if="tag === 'a'" v-on="handlers">
        <v-svg v-if="iconName && placement === 'before'" :name="iconName" :modifier="iconModifier" />
        <slot />
        <v-svg v-if="iconName && placement === 'after'" :name="iconName" :modifier="iconModifier" />
    </a>
    <button class="link" v-else :type="type" v-on="handlers">
        <v-svg v-if="iconName && placement === 'before'" :name="iconName" :modifier="iconModifier" />
        <slot />
        <v-svg v-if="iconName && placement === 'after'" :name="iconName" :modifier="iconModifier" />
    </button>
</template>

<script>
import VSvg from '../VSvg/VSvg.vue';

const placements = ['before', 'after'];
const validTags = ['a', 'button'];

import './VLink.critical.css';
import './VLink.css';

/**
 * Базовый класс для линка, поддерживает SVG
 */
export default {
    name: 'v-link',
    components: {
        VSvg,
    },
    props: {
        iconName: String,
        iconModifier: String,
        placement: {
            type: String,
            default: 'before',
            validator(value) {
                return placements.indexOf(value) !== -1;
            },
        },
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
    },

    computed: {
        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach(k => (handlers[k] = e => this.$emit(k, e)));
            return handlers;
        },
    },
};
</script>