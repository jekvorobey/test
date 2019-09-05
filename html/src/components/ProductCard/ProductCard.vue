<template>
    <component :is="tag" class="product-card">
        <div class="product-card__img">
            <img class="lazyload" data-src="https://via.placeholder.com/150" />
        </div>
        <v-link class="link--sm product-card__link" :href="href">{{ name }}</v-link>
        <div class="product-card__prices">
            <div class="text-sm product-card__price">{{ price }}</div>
            <div class="text-sm text-grey text-strike product-card__price">{{ oldPrice }}</div>
        </div>
    </component>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';
import './ProductCard.css';

export default {
    name: 'product-card',
    components: {
        VLink,
    },
    props: {
        tag: {
            type: String,
            default: 'div',
        },

        productId: {
            type: [String, Number],
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        href: {
            type: String,
        },

        price: {
            type: [String, Number],
            default: null,
        },

        oldPrice: {
            type: [String, Number],
            default: null,
        },
    },
    data() {
        return {};
    },
    computed: {},
    methods: {},
};
</script>

