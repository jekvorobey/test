<template>
    <li class="checkout-product-card">
        <router-link class="checkout-product-card__img" to="/catalog">
            <v-picture v-if="image && image.id" :image="image" alt="">
                <template v-slot:source="{ image, lazy }">
                    <source :data-srcset="generateSourcePath(56, 56, image.id, 'webp')" type="image/webp" />
                </template>
                <template v-slot:fallback="{ image, lazy, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(56, 56, image.id)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
            <v-svg v-else id="checkout-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        {{ name }}
    </li>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import { generatePictureSourcePath } from '@util/file';
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

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },
};
</script>