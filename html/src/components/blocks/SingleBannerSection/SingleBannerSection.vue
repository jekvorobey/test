<template>
    <section class="section">
        <div class="container single-banner-section">
            <div class="single-banner-section__inner">
                <catalog-banner-card class="single-banner-section__banner" :item="banner">
                    <template v-if="desktopImage">
                        <source
                            :data-srcset="getImageWithRetina(desktopImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 1024px)"
                        />
                        <source :data-srcset="getImageWithRetina(desktopImage)" media="(min-width: 1024px)" />
                    </template>
                    <template v-if="tabletImage">
                        <source
                            :data-srcset="getImageWithRetina(tabletImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 768px)"
                        />
                        <source :data-srcset="getImageWithRetina(tabletImage)" media="(min-width: 768px)" />
                    </template>
                    <template v-if="mobileImage">
                        <source
                            :data-srcset="getImageWithRetina(mobileImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 320px)"
                        />
                        <source :data-srcset="getImageWithRetina(mobileImage)" media="(min-width: 320px)" />
                    </template>
                    <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
                </catalog-banner-card>
            </div>
        </div>
    </section>
</template>

<script>
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import './SingleBannerSection.css';

export default {
    name: 'single-banner-section',

    components: {
        CatalogBannerCard,
    },

    props: {
        banner: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        mobileImage() {
            const image = this.banner.mobileImage || this.banner.tabletImage || this.banner.desktopImage;
            const imageRetina = this.banner.mobileImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image.substr(0, image.lastIndexOf('.')) + '.webp',
                    orig: image,
                    retinaWebp:
                        typeof imageRetina === 'string'
                            ? imageRetina.substr(0, imageRetina.lastIndexOf('.')) + '.webp'
                            : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(768, 576, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(768, 576, image.id),
                    retinaWebp: generatePictureSourcePath(1536, 1152, image.id, fileExtension.image.WEBP),
                    retinaOrig: generatePictureSourcePath(1536, 1152, image.id, image.sourceExt),
                };

            return null;
        },

        tabletImage() {
            const image = this.banner.tabletImage || this.banner.desktopImage;
            const imageRetina = this.banner.desktopImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image.substr(0, image.lastIndexOf('.')) + '.webp',
                    orig: image,
                    retinaWebp:
                        typeof imageRetina === 'string'
                            ? imageRetina.substr(0, imageRetina.lastIndexOf('.')) + '.webp'
                            : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(976, 306, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(976, 306, image.id),
                    retinaWebp: generatePictureSourcePath(1952, 612, image.id, fileExtension.image.WEBP),
                    retinaOrig: generatePictureSourcePath(1952, 612, image.id, image.sourceExt),
                };

            return null;
        },

        desktopImage() {
            const image = this.banner.desktopImage || this.banner.tabletImage;
            const imageRetina = this.banner.desktopImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image.substr(0, image.lastIndexOf('.')) + '.webp',
                    orig: image,
                    retinaWebp:
                        typeof imageRetina === 'string'
                            ? imageRetina.substr(0, imageRetina.lastIndexOf('.')) + '.webp'
                            : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(1224, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(1224, 240, image.id),
                    retinaWebp: generatePictureSourcePath(2448, 480, image.id, fileExtension.image.WEBP),
                    retinaOrig: generatePictureSourcePath(2448, 480, image.id, image.sourceExt),
                };

            return null;
        },

        defaultImage() {
            const image = this.banner.desktopImage || this.banner.tabletImage || this.banner.mobileImage;
            if (typeof image === 'string') return image;
            if (image) return generatePictureSourcePath(1224, 240, image.id);
            return null;
        },
    },

    methods: {
        getImageWithRetina(image, type = 'jpg') {
            let result = '';
            let imageOrig = '';
            let imageRetina = '';

            switch (type) {
                case 'webp':
                    imageOrig = image.webp;
                    imageRetina = image.retinaWebp;
                    break;
                default:
                    imageOrig = image.orig;
                    imageRetina = image.retinaOrig;
            }

            result += `${imageOrig} 1x`;
            if (imageRetina) {
                result += `, ${imageRetina} 2x`;
            }
            return result;
        },
    },
};
</script>
