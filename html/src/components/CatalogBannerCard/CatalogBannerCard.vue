<template>
    <div class="catalog-banner-card">
        <div class="catalog-banner-card__img">
            <v-picture v-if="image" :image="image" alt="">
                <template v-slot:source="{ image, lazy }">
                    <source
                        :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                        type="image/webp"
                        media="(min-width: 1024px)"
                    />
                </template>
                <template v-slot:fallback="{ image, lazy, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(300, 300, image.id, image.sourceExt)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
        </div>

        <div class="catalog-banner-card__panel">
            <div v-if="upperText" class="catalog-banner-card__panel-upper-text">
                {{ upperText }}
            </div>
            <div class="catalog-banner-card__panel-title">
                {{ title }}
            </div>
            <div v-if="bottomText" class="catalog-banner-card__panel-bottom-text">
                {{ bottomText }}
            </div>
            <v-button v-if="btnText" class="btn--outline catalog-banner-card__panel-btn">
                {{ btnText }}
            </v-button>
        </div>
    </div>
</template>

<script>
import VButton from '../controls/VButton/VButton.vue';
import VPicture from '../controls/VPicture/VPicture.vue';

import { generatePictureSourcePath } from '../../util/images';
import './CatalogBannerCard.css';

export default {
    name: 'catalog-banner-card',

    components: {
        VButton,
        VPicture,
    },

    props: {
        bannerId: {
            type: [Number, String],
        },

        upperText: {
            type: String,
        },

        bottomText: {
            type: String,
        },

        title: {
            type: String,
        },

        image: {
            type: [Object, String],
        },

        btnText: {
            type: String,
        },
    },

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },
};
</script>
