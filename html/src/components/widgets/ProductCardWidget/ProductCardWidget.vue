<template>
    <catalog-product-card v-bind="product" :offer-id="product.id" :freeBuy="product.freeBuy" show-buy-btn />
</template>

<script>
import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import './ProductCardWidget.css';

export default {
    name: 'product-card-widget',

    props: {
        product: {
            type: Object,
            default: () => {},
        },
    },

    components: {
        CatalogProductCard,
    },
};
</script>
