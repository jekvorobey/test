<template>
    <li class="cart-product-card" :class="{ 'cart-product-card--small': isSmall }">
        <a class="cart-product-card__img" :href="href">
            <v-picture v-if="image" :image="image" />
            <v-svg v-else id="cart-product-card-empty" name="logo" width="48" height="48" />
        </a>
        <div class="cart-product-card__body">
            <v-link class="cart-product-card__body-name" :href="href">{{ name }}</v-link>
            <div class="cart-product-card__body-panel">
                <v-counter :value="3" min="1" />
                <div class="cart-product-card__body-panel-prices">
                    <div class="text-bold cart-product-card__body-panel-price">{{ price }}</div>
                    <div v-show="oldPrice" class="text-sm text-grey text-strike cart-product-card__body-panel-price">
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
                <v-link class="cart-product-card__body-controls-link" tag="button">
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

        isSmall: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

