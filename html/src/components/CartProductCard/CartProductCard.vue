<template>
    <li class="cart-product-card" :class="{ 'cart-product-card--small': isSmall }">
        <router-link class="cart-product-card__img" :to="href">
            <v-picture v-if="image" :image="image" lazy />
            <v-svg v-else id="cart-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="cart-product-card__body">
            <v-link class="cart-product-card__body-name" :to="href">{{ name }}</v-link>
            <div class="cart-product-card__body-panel">
                <v-counter :value="count" min="0" @input="debounce_countChange" />
                <div class="cart-product-card__body-panel-prices">
                    <div class="text-bold cart-product-card__body-panel-price">{{ price }}</div>
                    <div
                        v-show="oldPrice"
                        class="text-grey text-strike cart-product-card__body-panel-price cart-product-card__body-panel-price--old"
                    >
                        {{ oldPrice }}
                    </div>
                </div>
            </div>
            <div class="text-grey text-sm cart-product-card__body-info">
                Ближайшая доставка 24 июня<br />
                Ближайший самовывоз c 26 июня
            </div>
            <div class="text-grey cart-product-card__body-bonus">+ 80 бонусов</div>
            <div class="cart-product-card__body-controls">
                <v-link class="cart-product-card__body-controls-link" tag="button">
                    <v-svg name="wishlist-middle" width="15" height="13" />
                    &nbsp;Перенести в избранное
                </v-link>
                <v-link class="cart-product-card__body-controls-link" tag="button" @click="onDeleteClick">
                    <v-svg name="cross-small" width="10" height="10" />
                    &nbsp;Удалить
                </v-link>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VPicture from '../controls/VPicture/VPicture.vue';
import VCounter from '../controls/VCounter/VCounter.vue';

import _debounce from 'lodash/debounce';
import '../../assets/images/sprites/cross-small.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/logo.svg';
import './CartProductCard.css';

export default {
    name: 'cart-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VCounter,
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

        count: {
            type: Number,
            default: 1,
        },

        isSmall: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        onCountChange(value) {
            if (value > 0) this.$emit('countChange', { id: this.productId, type: this.type, count: value });
            else this.$emit('deleteItem', { id: this.productId, type: this.type });
        },

        onDeleteClick() {
            this.$emit('deleteItem', { id: this.productId, type: this.type });
        },
    },

    created() {
        this.debounce_countChange = _debounce(this.onCountChange, 200);
    },
};
</script>

