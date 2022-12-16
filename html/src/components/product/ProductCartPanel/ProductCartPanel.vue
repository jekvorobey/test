<template>
    <div class="product-cart-panel">
        <div class="product-cart-panel__info">
            <div class="product-cart-panel__info-prices" v-bind="itemPropSettings">
                <price class="text-bold product-cart-panel__info-current" v-bind="modifiedPrice" item-prop>
                    <v-svg v-if="isThisNotNewOfferProduct"
                           class="catalog-product-list-card__prices-discount-svg"
                           name="offer-union"
                           key="offer-union"
                           width="20"
                           height="20"
                    />
                </price>
                <price v-if="oldPrice" class="text-grey product-cart-panel__info-old" v-bind="modifiedOldPrice" />
            </div>
            <installment-price
                    v-if="installment && installment.isInstallmentAvailable"
                    :value="price.value"
                    :installment-period="installment.installmentPeriod"
            />
            <div
                v-if="!referralPartner && bonus > 0 && (!isPriceHidden || price || oldPrice)"
                class="text-grey product-cart-panel__info-bonus"
            >
                + {{ bonus }} {{ bonusLabel }}
            </div>
        </div>
        <div class="product-cart-panel__controls">
            <buy-button
                class="product-cart-panel__btn product-cart-panel__controls-btn"
                @click="onAddToCart"
                :disabled="disabled"
                :loading="toCardAdding"
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
import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';
import InstallmentPrice from "@components/InstallmentPrice/InstallmentPrice.vue";
import VSvg from "@controls/VSvg/VSvg.vue";

import { mapGetters, mapState } from 'vuex';
import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import { pluralize } from '@util';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/offer-union.svg';
import './ProductCartPanel.css';

export default {
    name: 'product-cart-panel',

    components: {
        Price,
        BuyButton,
        FavoritesButton,
        InstallmentPrice,
        VSvg
    },

    props: {
        productId: {
            type: [Number, String],
            required: true,
        },

        isThisNotNewOfferProduct: {
            type: Boolean,
            default: false,
            required: false
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

        isPriceHidden: {
            type: Boolean,
            default: false,
        },

        toCardAdding: {
            type: Boolean,
            default: false,
        },

        installment: {
            type: [Object, Boolean],
            default: false,
        },
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
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

        modifiedPrice() {
            return this.price
                ? Object.assign(this.price, { isPriceHidden: this.isPriceHidden })
                : { isPriceHidden: this.isPriceHidden };
        },

        modifiedOldPrice() {
            return this.oldPrice
                ? Object.assign(this.oldPrice, { isPriceHidden: this.isPriceHidden })
                : { isPriceHidden: this.isPriceHidden };
        },

        itemPropSettings() {
            const { price } = this;

            return price
                ? {
                      itemprop: 'offers',
                      itemscope: true,
                      itemtype:
                          price.value instanceof Object
                              ? 'https://schema.org/AggregateOffer'
                              : 'https://schema.org/Offer',
                  }
                : {};
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
