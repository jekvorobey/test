<template>
    <div class="product-option-panel">
        <div class="product-option-panel__header">
            <div class="text-bold product-option-panel__header-text">
                <span class="text-uppercase">{{ header }} </span>
                <span class="product-option-panel__header-text-option">{{ selectedOption }}</span>
            </div>
            <div class="text-grey text-sm product-option-panel__header-note" v-if="note">{{ note }}</div>
        </div>
        <slot />
    </div>
</template>

<script>
import './ProductOptionPanel.css';

export default {
    name: 'product-tag-list',

    props: {
        header: {
            type: String,
            required: true,
        },

        selectedOption: {
            type: [String, Number],
        },

        note: {
            type: String,
        },
    },
};
</script>
