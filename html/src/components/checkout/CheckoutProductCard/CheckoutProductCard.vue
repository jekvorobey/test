<template>
    <li class="checkout-product-card">
        <router-link class="checkout-product-card__img" to="/catalog">
            <v-picture v-if="image" :image="image" />
            <v-svg v-else id="checkout-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        {{ name }}
    </li>
</template>
<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VLink from '../../controls/VLink/VLink.vue';
import VPicture from '../../controls/VPicture/VPicture.vue';

import './CheckoutProductCard.css';

export default {
    name: 'checkout-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
    },

    props: {
        name: {
            type: String,
            required: true,
        },

        image: {
            type: [String, Object],
        },
    },
};
</script>