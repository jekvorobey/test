<template>
    <router-link class="link" v-if="to" :to="to" :tag="tag" v-on="handlers">
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

/**
 * Базовый класс для линка, поддерживает SVG
 */
export default {
    name: 'v-link',
    inheritAttrs: false,
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

<style src="./critical.css"></style>
<style lang="postcss">
.link {
    &:hover {
    }
}

.link.is-disabled,
.is-disabled .link,
.link[disabled] {
    color: var(--cl-lg-grey);
    fill: var(--cl-lg-grey);
    border-color: var(--cl-lg-grey);
    pointer-events: none;
}
</style>