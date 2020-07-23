<template>
    <li class="order-masterclass-card" :class="{ 'order-masterclass-card--small': isSmall }">
        <router-link class="order-masterclass-card__img" :to="href">
            <v-picture v-if="image">
                <slot />
            </v-picture>
            <v-svg v-else id="order-masterclass-card-empty" name="logo" width="48" height="48" />
        </router-link>

        <div class="order-masterclass-card__body">
            <v-link class="order-masterclass-card__body-name" :to="href">
                <div>{{ name }}</div>
                <div v-if="note">({{ note }})</div>
            </v-link>

            <div class="order-masterclass-card__body-count">{{ count }} шт.</div>

            <div class="order-masterclass-card__body-prices">
                <price class="text-bold order-masterclass-card__body-price" v-bind="price" />
                <price
                    class="text-grey text-strike order-masterclass-card__body-price order-masterclass-card__body-price--old"
                    v-show="oldPrice"
                    v-bind="oldPrice"
                />
            </div>

            <div class="text-grey text-sm order-masterclass-card__body-info">
                <div>{{ additions }}</div>
                <div>{{ date }}, {{ author }}</div>
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
import './OrderMasterclassCard.css';

export default {
    name: 'order-masterclass-card',

    components: {
        VSvg,
        VLink,
        VPicture,

        Price,
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

        date: {
            type: [String, Date],
        },

        author: {
            type: String,
        },

        additions: {
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