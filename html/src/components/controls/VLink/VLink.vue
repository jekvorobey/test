<template>
    <a class="link" v-if="tag === 'a'" v-bind="$attrs" v-on="$listeners">
        <v-svg v-if="iconName && placement === 'before'" :name="iconName" :modifier="iconModifier" />
        <slot />
        <v-svg v-if="iconName && placement === 'after'" :name="iconName" :modifier="iconModifier" />
    </a>
    <button class="link" v-else-if="tag === 'button'" :type="type" v-bind="$attrs" v-on="$listeners">
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
    },
};
</script>
