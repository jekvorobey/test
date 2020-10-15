<template>
    <li class="package-product-card">
        <router-link class="package-product-card__img" :to="href">
            <v-picture v-if="image">
                <slot>
                    <source :data-srcset="images.desktop.webp" type="image/webp" />
                    <source :data-srcset="images.desktop.orig" />
                    <img class="blur-up lazyload v-picture__img" :data-src="images.defaultImg" />
                </slot>
            </v-picture>
            <v-svg v-else id="package-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="package-product-card__body">
            <div class="package-product-card__body-info">
                <v-link class="package-product-card__body-name" :to="href">{{ name }}</v-link>
                <div class="text-grey text-sm" v-if="note">{{ note }}</div>
            </div>

            <div class="package-product-card__body-count" v-if="showCount">{{ quantity }} шт</div>
            <div class="package-product-card__body-prices">
                <price class="text-bold package-product-card__body-price" v-bind="price" />
                <price
                    class="text-grey text-strike package-product-card__body-price--old"
                    v-if="oldPrice && oldPrice.value !== price.value"
                    v-bind="oldPrice"
                />
            </div>
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
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

        note: {
            type: String,
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
            type: [String, Number],
            default: 1,
        },

        showCount: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        quantity() {
            return Number(this.count);
        },

        images() {
            const { image } = this;
            if (image && image.id)
                return {
                    desktop: {
                        webp: generatePictureSourcePath(64, 64, image.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(64, 64, image.id),
                    },
                    defaultImg: generatePictureSourcePath(64, 64, image.id),
                };
        },
    },
};
</script>
