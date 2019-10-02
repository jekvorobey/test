<template>
    <div class="catalog-product-card">
        <div class="catalog-product-card__img">
            <img class="lazyload" :data-src="image" :alt="name" />
        </div>
        <div class="catalog-product-card__prices">
            <div class="catalog-product-card__price">{{ oldPrice ? `от ${price}` : price }}</div>
            <div v-show="oldPrice" class="text-sm text-grey text-strike catalog-product-card__price">
                от {{ oldPrice }}
            </div>
            <button class="catalog-product-card__btn">
                <v-svg name="add-to-cart-small" width="27" height="18" />
            </button>
        </div>
        <v-link class="link--sm catalog-product-card__link" :href="href">{{ name }}</v-link>
        <div class="catalog-product-card__tags">
            <tag class="text-sm catalog-product-card__tags-tag" v-for="(tag, index) in tags" :key="index" :text="tag" />
        </div>
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import Tag from '../Tag/Tag.vue';

import '../../assets/images/sprites/add-to-cart-small.svg';
import './CatalogProductCard.css';

export default {
    name: 'catalog-product-card',
    components: {
        VSvg,
        VLink,

        Tag,
    },
    props: {
        tags: {
            type: Array,
            default() {
                return [];
            },
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

        image: {
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

