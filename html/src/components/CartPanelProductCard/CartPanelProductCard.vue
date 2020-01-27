<template>
    <li class="cart-panel-product-card">
        <router-link class="cart-panel-product-card__img" :to="href">
            <v-picture v-if="image && image.id" :image="image" alt="">
                <template v-slot:source="{ image }">
                    <source :data-srcset="generateSourcePath(300, 300, image.id, 'webp')" type="image/webp" />
                </template>
                <template v-slot:fallback="{ image, lazy, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(300, 300, image.id, image.sourceExt)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
            <v-svg v-else id="cart-panel-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="cart-panel-product-card__body">
            <v-link class="cart-panel-product-card__body-name" :to="href">{{ name }}</v-link>
            <div class="cart-panel-product-card__body-prices">
                <div class="text-bold cart-panel-product-card__body-price">{{ price }}</div>
                <div
                    v-show="oldPrice"
                    class="text-grey text-strike cart-panel-product-card__body-price cart-panel-product-card__body-price--old"
                >
                    {{ oldPrice }}
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VPicture from '../controls/VPicture/VPicture.vue';

import { generatePictureSourcePath } from '../../util/images';
import _debounce from 'lodash/debounce';
import '../../assets/images/sprites/cross-small.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/logo.svg';
import './CartPanelProductCard.css';

export default {
    name: 'cart-panel-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
    },

    props: {
        productId: {
            type: [String, Number],
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        href: {
            type: String,
            default: '/',
        },

        image: {
            type: [String, Object],
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

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },
};
</script>
