<template>
    <a class="btn" v-if="href" :href="href" v-on="handlers">
        <v-svg v-if="iconName && placement === 'before'" :name="iconName" :modifier="iconModifier" />
        <slot />
        <v-svg v-if="iconName && placement === 'after'" :name="iconName" :modifier="iconModifier" />
    </a>
    <router-link class="btn" v-else-if="to" :to="to" v-on="handlers">
        <v-svg v-if="iconName && placement === 'before'" :name="iconName" :modifier="iconModifier" />
        <slot />
        <v-svg v-if="iconName && placement === 'after'" :name="iconName" :modifier="iconModifier" />
    </router-link>
    <button class="btn" v-else :type="type" v-on="handlers">
        <v-svg v-if="iconName && placement === 'before'" :name="iconName" :modifier="iconModifier" />
        <slot />
        <v-svg v-if="iconName && placement === 'after'" :name="iconName" :modifier="iconModifier" />
    </button>
</template>

<script>
import VSvg from '../VSvg/VSvg.vue';
import './VButton.css';

const placements = ['before', 'after'];
const types = ['button', 'reset', 'submit'];

/**
 * Базовый класс для кнопки, поддерживает SVG
 */
export default {
    name: 'v-button',
    components: {
        VSvg,
    },
    props: {
        iconName: String,
        iconModifier: String,
        type: {
            type: String,
            default: 'button',
            validator(value) {
                return types.indexOf(value) !== -1;
            },
        },
        placement: {
            type: String,
            default: 'before',
            validator(value) {
                return placements.indexOf(value) !== -1;
            },
        },
        href: {
            type: String,
        },
        to: {
            type: [String, Object],
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
