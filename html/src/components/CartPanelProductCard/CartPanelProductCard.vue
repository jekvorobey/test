<template>
    <li class="cart-panel-product-card" :class="isFavorite && 'cart-panel-product-card--favorites'">
        <router-link v-if="href" class="cart-panel-product-card__img" :to="href">
            <v-picture :key="image.id" v-if="image && image.id">
                <source :data-srcset="desktopImage.webp" type="image/webp" />
                <source :data-srcset="desktopImage.orig" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
            </v-picture>
            <v-svg v-else id="cart-panel-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="cart-panel-product-card__img" v-else>
            <v-picture :key="image.id" v-if="image && image.id">
                <source :data-srcset="desktopImage.webp" type="image/webp" />
                <source :data-srcset="desktopImage.orig" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
            </v-picture>
            <v-svg v-else id="cart-panel-product-card-empty" name="logo" width="48" height="48" />
        </div>

        <div class="cart-panel-product-card__body" :class="{ 'cart-panel-product-card__body--favorite': isFavorite }">
            <v-link class="cart-panel-product-card__body-name" :to="href">
                <v-clamp :max-lines="3" autoresize>{{ name }}</v-clamp>
                <div v-if="note">({{ note }})</div>
            </v-link>
            <div class="cart-panel-product-card__body-prices">
                <price
                    class="text-grey text-strike cart-panel-product-card__body-price cart-panel-product-card__body-price--old"
                    v-if="oldPrice"
                    v-bind="oldPrice"
                />
                <price class="text-bold cart-panel-product-card__body-price" v-bind="price" />
            </div>
        </div>
        <buy-button
            v-if="isFavorite"
            class="btn--outline cart-panel-product-card__btn"
            :class="{ 'cart-panel-product-card__btn--loader': isLoadButton }"
            @click.prevent="onBuyButtonClick"
            :disabled="insideBasket"
            :freeBuy="freeBuy"
        >
            {{ insideBasket ? 'В корзине' : 'В корзину' }}
        </buy-button>
    </li>
</template>

<script>
import VClamp from 'vue-clamp';
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';

import _debounce from 'lodash/debounce';
import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import '@images/sprites/cross-small.svg';
import '@images/sprites/logo.svg';
import './CartPanelProductCard.css';

export default {
    name: 'cart-panel-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VClamp,

        Price,
        BuyButton,
    },

    props: {
        name: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        note: {
            type: String,
        },

        href: {
            type: String,
        },

        image: {
            type: [String, Object],
        },

        price: {
            type: [Object, String],
        },

        stock: {
            type: [Object, String],
        },

        oldPrice: {
            type: [Object, String],
        },

        isFavorite: {
            type: Boolean,
        },

        isLoadButton: {
            type: Boolean,
        },

        insideBasket: {
            type: Boolean,
        },

        freeBuy: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        desktopImage() {
            if (this.image && this.image.id)
                return {
                    webp: generatePictureSourcePath(300, 300, this.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(300, 300, this.image.id),
                };
        },

        defaultImage() {
            if (this.image && this.image.id) return generatePictureSourcePath(300, 300, this.image.id);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        onBuyButtonClick() {
            this.$emit('add-item', { id: this.offerId, storeId: this.stock.storeId, type: this.type });
        },
    },
};
</script>
