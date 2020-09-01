<template>
    <router-link tag="a" class="recently-viewed-product-card" :to="href">
        <div class="recently-viewed-product-card__img">
            <v-picture :key="image.id" v-if="images">
                <source :data-srcset="images.desktop.webp" type="image/webp" media="(min-width: 480px)" />
                <source :data-srcset="images.desktop.orig" media="(min-width: 480px)" />
                <source :data-srcset="images.mobile.webp" type="image/webp" media="(max-width: 479px)" />
                <source :data-srcset="images.mobile.orig" media="(max-width: 479px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="images.default" alt="" />
            </v-picture>
            <v-svg v-else id="recently-viewed-product-card-empty" name="logo" width="48" height="48" />
        </div>
        <div class="recently-viewed-product-card__body">
            <div class="recently-viewed-product-card__title">
                {{ name }}
            </div>
        </div>
    </router-link>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';

import '@images/sprites/logo.svg';
import './RecentlyViewedProductCard.css';

export default {
    name: 'recently-viewed-product-card',
    components: {
        VSvg,
        VLink,
        VPicture,
    },

    props: {
        offerId: {
            type: [String, Number],
        },

        productId: {
            type: [String, Number],
        },

        name: {
            type: String,
        },

        href: {
            type: [Object, String],
            default: '/',
        },

        image: {
            type: Object,
        },
    },

    computed: {
        images() {
            const { image } = this;

            if (image && image.id)
                return {
                    desktop: {
                        webp: generatePictureSourcePath(300, 300, image.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(300, 300, image.id),
                    },

                    mobile: {
                        webp: generatePictureSourcePath(200, 200, image.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(200, 200, image.id),
                    },

                    default: generatePictureSourcePath(200, 200, image.id),
                };
        },
    },
};
</script>