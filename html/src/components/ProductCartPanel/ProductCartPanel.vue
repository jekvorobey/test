<template>
    <div class="product-cart-panel">
        <div class="product-cart-panel__info">
            <div class="product-cart-panel__info-prices">
                <price
                    class="text-bold product-cart-panel__info-current"
                    :value="price.value"
                    :currency="price.currency"
                />
                <price
                    v-if="oldPrice"
                    class="text-grey text-strike product-cart-panel__info-old"
                    :value="oldPrice.value"
                    :currency="oldPrice.currency"
                />
            </div>
            <div class="text-grey product-cart-panel__info-bonus">+{{ $t('product.bonus', { n: bonus }) }}</div>
        </div>
        <div class="product-cart-panel__controls">
            <v-button class="product-cart-panel__controls-btn" @click="onAddToCart" :disabled="!canBuy">
                {{ canBuy ? 'Добавить в корзину' : 'Нет в наличии' }}
            </v-button>
            <v-link class="product-cart-panel__controls-wishlist" @click="onAddToWishlist">
                <v-svg id="product-wishlist" name="wishlist-middle" width="20" height="18" />
                &nbsp;В избранное
            </v-link>
        </div>
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VButton from '../controls/VButton/VButton.vue';
import Price from '../Price/Price.vue';

import '../../assets/images/sprites/wishlist-middle.svg';
import './ProductCartPanel.css';

export default {
    name: 'product-cart-panel',
    components: {
        VSvg,
        VLink,
        VButton,

        Price,
    },

    props: {
        price: {
            type: Object,
            default() {
                return {};
            },
        },

        oldPrice: {
            type: Object,
            default() {
                return {};
            },
        },

        bonus: {
            type: Number,
        },

        canBuy: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        onAddToCart() {
            this.$emit('cart');
        },

        onAddToWishlist() {
            this.$emit('wishlist');
        },
    },
};
</script>
