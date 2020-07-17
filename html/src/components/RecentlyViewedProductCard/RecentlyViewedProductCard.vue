<template>
   <router-link tag="div" class="recently-viewed-product-card" :class="{ 'recently-viewed-product-card--small': isSmall }" :to="href">
       <div class="recently-viewed-product-card__img">
            <v-picture :key="image.id" v-if="image && image.id">
                <source :data-srcset="bigImg.webp" type="image/webp" media="(min-width: 480px)" />
                <source :data-srcset="bigImg.orig" media="(min-width: 480px)" />
                <source :data-srcset="smallImg.webp" type="image/webp" media="(max-width: 479px)" />
                <source :data-srcset="smallImg.orig" media="(max-width: 479px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt="" />
            </v-picture>
            <v-svg v-else id="recently-viewed-product-card-empty" name="logo" width="48" height="48" />
        </div>
        <div class="recently-viewed-product-card__body">
            <div class="recently-viewed-product-card__title">
                {{ title }}
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

    props: {
        offerId: {
            type: [String, Number],
            required: true,
        },

        productId: {
            type: [String, Number],
            required: true,
        },

        name: {
            type: String,
            required: true,
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
        bigImg() {
            return {
                webp: generatePictureSourcePath(300, 300, this.image.id, fileExtension.image.WEBP),
                orig: generatePictureSourcePath(300, 300, this.image.id),
            };
        },

        smallImg() {
            return {
                webp: generatePictureSourcePath(200, 200, this.image.id, fileExtension.image.WEBP),
                orig: generatePictureSourcePath(200, 200, this.image.id),
            };
        },

        defaultImg() {
            return generatePictureSourcePath(200, 200, this.image.id);
        },

        title() {
            if (this.name.length > 80) {
                return this.name.substring(0, 80) + '...';
            } else {
                return this.name;
            }
        },
    },

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    }
}
</script>