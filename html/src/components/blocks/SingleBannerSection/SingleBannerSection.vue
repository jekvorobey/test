<template>
    <section class="section">
        <div class="container single-banner-section">
            <div class="single-banner-section__inner">
                <catalog-banner-card class="single-banner-section__banner" :item="banner">
                    <template v-if="desktopImage">
                        <source :data-srcset="getWebpImageWithRetina(desktopImage)" type="image/webp" media="(min-width: 1024px)" />
                        <source :data-srcset="desktopImage.orig" media="(min-width: 1024px)" />
                    </template>
                    <template v-if="tabletImage">
                        <source :data-srcset="getWebpImageWithRetina(tabletImage)" type="image/webp" media="(min-width: 768px)" />
                        <source :data-srcset="tabletImage.orig" media="(min-width: 768px)" />
                    </template>
                    <template v-if="mobileImage">
                        <source :data-srcset="getWebpImageWithRetina(mobileImage)" type="image/webp" media="(min-width: 320px)" />
                        <source :data-srcset="mobileImage.orig" media="(min-width: 320px)" />
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
            const imageRetina  = this.banner.mobileImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image,
                    orig: image,
                    retina: imageRetina,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(320, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(320, 240, image.id),
                };
        },

        tabletImage() {
            const image = this.banner.tabletImage || this.banner.desktopImage;
            const imageRetina  = this.banner.desktopImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image,
                    orig: image,
                    retina: imageRetina,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(768, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(768, 240, image.id),
                };
        },

        desktopImage() {
            const image = this.banner.desktopImage || this.banner.tabletImage;
            const imageRetina  = this.banner.desktopImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image,
                    orig: image,
                    retina: imageRetina,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(1224, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(1224, 240, image.id),
                };
        },

        defaultImage(item) {
            const image = this.banner.desktopImage || this.banner.tabletImage || this.banner.mobileImage;
            if (typeof image === 'string') return image;
            if (image) return generatePictureSourcePath(1224, 240, image.id);
        },
    },

    methods: {
        getWebpImageWithRetina(image) {
            let result = '';
            result += `${image.webp} 1x`;
            if (image.retina) {
                result += `, ${image.retina} 2x`;
            }
            return result;
        }
    }
};
</script>
