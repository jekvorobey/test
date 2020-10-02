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
            <div v-if="!referralPartner && bonus > 0" class="text-grey product-cart-panel__info-bonus">
                + {{ bonus }} {{ bonusLabel }}
            </div>
        </div>
        <div class="product-cart-panel__controls">
            <buy-button
                class="product-cart-panel__btn product-cart-panel__controls-btn"
                @click="onAddToCart"
                :disabled="disabled"
            >
                <slot />
            </buy-button>

            <favorites-button
                class="product-cart-panel__btn product-cart-panel__controls-wishlist"
                @click="onAddToWishlist"
                :isActive="inFavorites"
            >
                &nbsp;{{ favoritesBtnText }}
            </favorites-button>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';

import { mapGetters, mapActions, mapState } from 'vuex';
import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import { pluralize } from '@util';
import '@images/sprites/wishlist-middle.svg';
import './ProductCartPanel.css';

export default {
    name: 'product-cart-panel',

    components: {
        VSvg,
        VLink,

        Price,
        BuyButton,
        FavoritesButton,
    },

    props: {
        productId: {
            type: [Number, String],
            required: true,
        },

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
            default: 0,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: state => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        favoritesBtnText() {
            return this.inFavorites ? 'В избранном' : 'В избранноe';
        },

        bonusLabel() {
            const { bonus } = this;
            return pluralize(bonus, ['бонус', 'бонуса', 'бонусов']);
        },

        inFavorites() {
            return this[IS_IN_FAVORITES](this.productId);
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
