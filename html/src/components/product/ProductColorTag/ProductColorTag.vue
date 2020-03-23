<template>
    <button
        class="product-color-tag"
        :class="{ ['product-color-tag--selected']: selected }"
        :disabled="disabled"
        :style="buttonStyle"
        v-on="$listeners"
    >
        <div class="product-color-tag__square" :style="innerStyle" />
    </button>
</template>

<script>
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
        buttonStyle() {
            return {
                borderColor: this.selected ? `#${this.color}` : null,
            };
        },

        innerStyle() {
            return {
                backgroundColor: `#${this.color}`,
            };
        },
    },
};
</script>
