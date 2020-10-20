<template>
    <router-link class="product-masterclass-card" :to="href">
        <v-picture class="product-masterclass-card__img" v-if="image">
            <slot />
        </v-picture>

        <div class="product-masterclass-card__panel">
            <div class="text-bold product-masterclass-card__panel-info">
                <div class="text-bold product-masterclass-card__panel-name">
                    {{ name }}
                </div>
                <div class="product-masterclass-card__panel-note" v-if="note">
                    {{ note }}
                </div>
                <div class="product-masterclass-card__panel-description" v-if="date">
                    {{ date }}
                </div>
            </div>
            <div class="product-masterclass-card__panel-price" v-if="price">
                <price class="text-bold" v-bind="price" />
            </div>
        </div>
    </router-link>
</template>

<script>
import Price from '@components/Price/Price.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import './ProductMasterclassCard.css';

export default {
    name: 'product-masterclass-card',

    components: {
        Price,
        VPicture,
    },

    props: {
        name: {
            type: String,
        },

        note: {
            type: String,
        },

        image: {
            type: [String, Object],
        },

        href: {
            type: [String, Object],
        },

        date: {
            type: [String, Date],
        },

        price: {
            type: Object,
        },

        to: {
            type: [String, Object],
            default: '/',
        },
    },
};
</script>
