<template>
    <li class="checkout-masterclass-card" :class="{ 'checkout-masterclass-card--small': isSmall }">
        <router-link class="checkout-masterclass-card__img" :to="href">
            <v-picture v-if="image">
                <slot />
            </v-picture>
            <v-svg v-else id="checkout-masterclass-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="checkout-masterclass-card__body">
            <v-link class="checkout-masterclass-card__body-name" :to="href">{{ name }}</v-link>
            <div class="checkout-masterclass-card__body-count">
                {{ count }}
            </div>
            <div class="checkout-masterclass-card__body-prices">
                <price class="text-bold checkout-masterclass-card__body-price" v-bind="price" />
                <price
                    class="text-grey text-strike checkout-masterclass-card__body-price checkout-masterclass-card__body-price--old"
                    v-show="oldPrice"
                    v-bind="oldPrice"
                />
            </div>
            <div class="text-grey text-sm checkout-masterclass-card__body-info">
                <div>{{ date }}</div>
                <div>{{ author }}</div>
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';

import '@images/sprites/logo.svg';
import './CheckoutMasterclassCard.css';

export default {
    name: 'checkout-masterclass-card',

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

        href: {
            type: String,
        },

        type: {
            type: String,
            required: true,
        },

        image: {
            type: [String, Object],
        },

        date: {
            type: [String, Date],
        },

        author: {
            type: String,
        },

        price: {
            type: Object,
        },

        oldPrice: {
            type: Object,
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

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },
    },
};
</script>
