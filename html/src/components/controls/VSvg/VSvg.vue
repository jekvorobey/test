<template>
    <svg class="icon" :class="modifier">
        <use v-bind="{ 'xlink:href': `#icon-${name}` }"></use>
    </svg>
</template>

<script>
import './VSvg.css';

/**
 * Базовый класс для SVG
 */
export default {
    name: 'v-svg',
    props: {
        id: { default: 'id' },
        name: { type: String, default: null },
        modifier: { type: String, default: null },
    },
    serverCacheKey: (props) =>
        props.modifier ? `${props.id}-${props.name}-${props.modifier}` : `${props.id}-${props.name}`,
};
</script>
