<template>
    <svg class="icon" :class="{ [`icon--${modifier || name}`]: modifier || name }">
        <use v-bind="{ 'xlink:href': `#icon-${name}` }"></use>
    </svg>
</template>

<script>
/**
 * Базовый класс для SVG
 */
export default {
    name: 'v-svg',
    props: {
        name: { type: String, default: null },
        modifier: { type: String, default: null },
    },
    serverCacheKey: props => (props.modifier ? `${props.name}-${props.modifier}` : props.name),
};
</script>

<style lang="postcss">
.icon {
    &--rotate {
        &-deg45 {
            transform: rotate(45deg);
        }

        &-deg90 {
            transform: rotate(90deg);
        }

        &-deg180 {
            transform: rotate(180deg);
        }

        &-deg270 {
            transform: rotate(270deg);
        }

        &-deg360 {
            transform: rotate(360deg);
        }
    }
}
</style>
