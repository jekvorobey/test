<template>
    <li class="cart-panel-product-card">
        <router-link class="cart-panel-product-card__img" :to="href">
            <v-picture v-if="image && image.id" :image="image">
                <source :data-srcset="desktopImage" type="image/webp" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
            </v-picture>
            <v-svg v-else id="cart-panel-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="cart-panel-product-card__body">
            <v-link class="cart-panel-product-card__body-name" :to="href">{{ name }}</v-link>
            <div class="cart-panel-product-card__body-prices">
                <price class="text-bold cart-panel-product-card__body-price" v-bind="price" />
                <price
                    class="text-grey text-strike cart-panel-product-card__body-price cart-panel-product-card__body-price--old"
                    v-if="oldPrice"
                    v-bind="oldPrice"
                />
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';

import { generatePictureSourcePath } from '@util/file';
import _debounce from 'lodash/debounce';
import '@images/sprites/cross-small.svg';
import '@images/sprites/logo.svg';
import './CartPanelProductCard.css';
import { fileExtension } from '../../assets/scripts/enums';

export default {
    name: 'cart-panel-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,

        Price,
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
            type: [Object, String],
        },

        oldPrice: {
            type: [Object, String],
        },
    },

    computed: {
        desktopImage() {
            if (this.image && this.image.id)
                return generatePictureSourcePath(300, 300, this.image.id, fileExtension.image.WEBP);
        },

        defaultImage() {
            if (this.image && this.image.id)
                return generatePictureSourcePath(300, 300, this.image.id, this.image.sourceExt);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },
};
</script>
