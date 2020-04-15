<template>
    <li class="product-tip-card">
        <div class="product-tip-card__img">
            <v-picture v-if="image && image.id">
                <source
                    :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                    type="image/webp"
                    media="(min-width: 480px)"
                />
                <source
                    :data-srcset="generateSourcePath(200, 200, image.id, 'webp')"
                    type="image/webp"
                    media="(max-width: 479px)"
                />
                <img
                    class="blur-up lazyload v-picture__img"
                    :data-src="generateSourcePath(300, 300, image.id)"
                    alt=""
                />
            </v-picture>
            <v-svg v-else id="product-tip-card-empty" name="logo" width="48" height="48" />
        </div>
        <div class="product-tip-card__body">
            {{ text }}
        </div>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import '@images/sprites/logo.svg';
import './ProductTipCard.css';

import { generatePictureSourcePath } from '@util/file';

export default {
    name: 'product-tip-card',

    components: {
        VSvg,
        VPicture,
    },

    props: {
        text: {
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
