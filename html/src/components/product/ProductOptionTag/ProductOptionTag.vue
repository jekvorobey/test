<template>
    <button
        class="product-option-tag"
        :class="{ ['product-option-tag--selected']: selected }"
        :disabled="disabled"
        v-on="$listeners"
    >
        <slot />
    </button>
</template>

<script>
import './ProductOptionTag.css';

export default {
    name: 'product-option-tag',

    props: {
        selected: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
