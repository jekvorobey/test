<template>
    <button
        class="product-color-tag"
        :class="[{ ['product-color-tag--selected']: selected }, { ['product-color-tag--light']: isLightColor }]"
        :disabled="disabled"
        :style="buttonStyle"
        v-on="$listeners"
    >
        <div class="product-color-tag__square" :style="innerStyle" />
    </button>
</template>

<script>
import { isLightColor } from '@util';
import './ProductColorTag.css';

export default {
    name: 'product-color-tag',

    props: {
        color: {
            type: String,
        },

        selected: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        innerColor() {
            const { color } = this;
            return `#${color}`;
        },

        innerStyle() {
            const { innerColor } = this;
            return {
                backgroundColor: innerColor,
            };
        },

        buttonStyle() {
            const { innerColor, selected } = this;
            return {
                borderColor: selected ? innerColor : null,
            };
        },

        isLightColor() {
            const { innerColor } = this;
            return isLightColor(innerColor);
        },
    },
};
</script>
