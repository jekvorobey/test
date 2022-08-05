<template>
    <section
        v-if="banners.length > 0"
        class="section slider-banners-section"
        :style="[{ 'background-color': sectionBackgroundColor }, cssVariables]"
    >
        <v-slider
            v-model="currentSlideIndex"
            class="container slider-banners-section__slider"
            name="banners"
            :options="sliderOptions"
        >
            <template v-for="banner in items">
                <slot name="item" :item="banner">
                    <catalog-banner-card
                        class="swiper-slide slider-banners-section__card"
                        :key="banner.id"
                        :item="banner"
                    >
                        <template v-if="banner.desktopImage">
                            <source
                                :data-srcset="getImageWithRetina(banner.desktopImage, 'webp')"
                                type="image/webp"
                                media="(min-width: 1024px)"
                            />
                            <source
                                :data-srcset="getImageWithRetina(banner.desktopImage)"
                                media="(min-width: 1024px)"
                            />
                        </template>
                        <template v-if="banner.tabletImage">
                            <source
                                :data-srcset="getImageWithRetina(banner.tabletImage, 'webp')"
                                type="image/webp"
                                media="(min-width: 768px)"
                            />
                            <source :data-srcset="getImageWithRetina(banner.tabletImage)" media="(min-width: 768px)" />
                        </template>
                        <template v-if="banner.mobileImage">
                            <source
                                :data-srcset="getImageWithRetina(banner.mobileImage, 'webp')"
                                type="image/webp"
                                media="(min-width: 320px)"
                            />
                            <source :data-srcset="getImageWithRetina(banner.mobileImage)" media="(min-width: 320px)" />
                        </template>
                        <img
                            class="blur-up lazyload v-picture__img"
                            :data-src="banner.defaultImage"
                            alt=""
                            loading="lazy"
                        />
                    </catalog-banner-card>
                </slot>
            </template>
        </v-slider>
    </section>
</template>

<script>
import VSlider from '@controls/VSlider/VSlider.vue';
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import './SliderBannersSection.css';

const sliderOptions = {
    slidesPerView: 1,
    grabCursor: true,
    // loop: true,
    autoplay: {
        delay: 10000,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
};

export default {
    name: 'slider-banners-section',

    components: {
        VSlider,
        CatalogBannerCard,
    },

    props: {
        banners: {
            type: Array,
            default() {
                return [];
            },
        },

        desktopSize: {
            type: Array,
            default: () => [1224, 420],
        },

        tabletSize: {
            type: Array,
            default: () => [1024, 533],
        },

        mobileSize: {
            type: Array,
            default: () => [768, 653],
        },
    },

    data() {
        return {
            currentSlideIndex: 0,
        };
    },

    computed: {
        sliderOptions() {
            return sliderOptions;
        },

        items() {
            return this.banners.map((b) => ({
                ...b,
                mobileImage: this.mobileImage(b),
                tabletImage: this.tabletImage(b),
                desktopImage: this.desktopImage(b),
                defaultImage: this.defaultImage(b),
            }));
        },

        currentImage() {
            return this.items[this.currentSlideIndex];
        },

        sectionBackgroundColor() {
            if (
                this.currentImage &&
                typeof this.currentImage.color !== 'undefined' &&
                this.currentImage.color !== null
            ) {
                return this.currentImage.color;
            }

            return '#E6E6F0';
        },

        bannerControlsColor() {
            if (
                this.currentImage &&
                typeof this.currentImage.controlsColor !== 'undefined' &&
                this.currentImage.controlsColor
            ) {
                return this.currentImage.controlsColor;
            }

            return '#000000';
        },

        cssVariables() {
            return {
                '--slider-banners-section-controls-color': this.bannerControlsColor,
            };
        },
    },

    methods: {
        mobileImage(banner) {
            const image = banner.mobileImage || banner.tabletImage || banner.desktopImage;
            const imageRetina = banner.mobileImageRetina || banner.tabletImageRetina;

            if (typeof image === 'string' && image.slice(-3) === 'gif') {
                return {
                    webp: image,
                    orig: image,
                    retinaWebp: typeof imageRetina === 'string' ? imageRetina : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };
            }

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
                    webp: generatePictureSourcePath(
                        this.mobileSize[0],
                        this.mobileSize[1],
                        image.id,
                        fileExtension.image.WEBP
                    ),
                    orig: generatePictureSourcePath(this.mobileSize[0], this.mobileSize[1], image.id),
                    retinaWebp: generatePictureSourcePath(
                        this.mobileSize[0] * 2,
                        this.mobileSize[1] * 2,
                        image.id,
                        fileExtension.image.WEBP
                    ),
                    retinaOrig: generatePictureSourcePath(
                        this.mobileSize[0] * 2,
                        this.mobileSize[1] * 2,
                        image.id,
                        image.sourceExt
                    ),
                };
        },

        tabletImage(banner) {
            const image = banner.tabletImage || banner.desktopImage;
            const imageRetina = banner.tabletImageRetina || banner.desktopImageRetina;

            if (typeof image === 'string' && image.slice(-3) === 'gif') {
                return {
                    webp: image,
                    orig: image,
                    retinaWebp: typeof imageRetina === 'string' ? imageRetina : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };
            }

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

            if (image) {
                return {
                    webp: generatePictureSourcePath(
                        this.tabletSize[0],
                        this.tabletSize[1],
                        image.id,
                        fileExtension.image.WEBP
                    ),
                    orig: generatePictureSourcePath(this.tabletSize[0], this.tabletSize[1], image.id),
                    retinaWebp: generatePictureSourcePath(
                        this.tabletSize[0] * 2,
                        this.tabletSize[1] * 2,
                        image.id,
                        fileExtension.image.WEBP
                    ),
                    retinaOrig: generatePictureSourcePath(
                        this.tabletSize[0] * 2,
                        this.tabletSize[1] * 2,
                        image.id,
                        image.sourceExt
                    ),
                };
            }
        },

        desktopImage(banner) {
            const image = banner.desktopImage || banner.tabletImage;
            const imageRetina = banner.desktopImageRetina || banner.tabletImageRetina;

            if (typeof image === 'string' && image.slice(-3) === 'gif') {
                return {
                    webp: image,
                    orig: image,
                    retinaWebp: typeof imageRetina === 'string' ? imageRetina : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };
            }

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
                    webp: generatePictureSourcePath(
                        this.desktopSize[0],
                        this.desktopSize[1],
                        image.id,
                        fileExtension.image.WEBP
                    ),
                    orig: generatePictureSourcePath(
                        this.desktopSize[0],
                        this.desktopSize[1],
                        image.id,
                        image.sourceExt
                    ),
                    retinaWebp: generatePictureSourcePath(
                        this.desktopSize[0] * 2,
                        this.desktopSize[1] * 2,
                        image.id,
                        fileExtension.image.WEBP
                    ),
                    retinaOrig: generatePictureSourcePath(
                        this.desktopSize[0] * 2,
                        this.desktopSize[1] * 2,
                        image.id,
                        image.sourceExt
                    ),
                };
        },

        defaultImage(banner) {
            const image = banner.desktopImage || banner.tabletImage || banner.mobileImage;
            if (typeof image === 'string') return image;
            if (image) return generatePictureSourcePath(this.desktopSize[0], this.desktopSize[1], image.id);
        },

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
