<template>
    <li class="package-product-card">
        <router-link class="package-product-card__img" :to="href">
            <v-picture v-if="image" :image="image" alt="">
                <template v-slot:source="{ image, lazy }">
                    <source :data-srcset="generateSourcePath(64, 64, image.id, 'webp')" type="image/webp" />
                </template>
                <template v-slot:fallback="{ image, lazy, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(64, 64, image.id, image.sourceExt)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
            <v-svg v-else id="package-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="package-product-card__body">
            <v-link class="package-product-card__body-name" :to="href">{{ name }}</v-link>
            <div class="package-product-card__body-count">{{ count }} шт</div>
            <div class="package-product-card__body-prices">
                <price class="text-bold package-product-card__body-price" v-bind="price" />
                <price
                    class="text-grey text-strike package-product-card__body-price--old"
                    v-if="oldPrice"
                    v-bind="oldPrice"
                />
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VPicture from '../controls/VPicture/VPicture.vue';

import Price from '../Price/Price.vue';

import { generatePictureSourcePath } from '../../util/images';
import './PackageProductCard.css';

export default {
    name: 'package-product-card',

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

        href: {
            type: String,
            default: '/',
        },

        image: {
            type: [String, Object],
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
    },

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },
};
</script>