<template>
    <div class="product-option-panel">
        <div class="product-option-panel__header">
            <div class="text-bold text-uppercase">{{ header }}</div>
            <div v-if="note" class="text-grey text-sm">{{ note }}</div>
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

        note: {
            type: String,
        },
    },
};
</script>
