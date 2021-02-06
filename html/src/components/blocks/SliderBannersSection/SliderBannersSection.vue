<template>
    <section class="section slider-banners-section" :style="{ 'background-color': backgroundColor }">
        <v-slider class="container slider-banners-section__slider" name="banners" :options="sliderOptions">
            <template v-for="banner in items">
                <slot name="item" :item="banner">
                    <catalog-banner-card
                        class="swiper-slide slider-banners-section__card"
                        :key="banner.id"
                        :item="banner"
                    >
                        <template v-if="banner.desktopImage">
                            <source
                                :data-srcset="getImageWithRetina(banner.desktopImage)"
                                media="(min-width: 1024px)"
                            />
                            <source
                                :data-srcset="getImageWithRetina(banner.desktopImage, 'webp')"
                                type="image/webp"
                                media="(min-width: 1024px)"
                            />
                        </template>
                        <template v-if="banner.tabletImage">
                            <source :data-srcset="getImageWithRetina(banner.tabletImage)" media="(min-width: 768px)" />
                            <source
                                :data-srcset="getImageWithRetina(banner.tabletImage, 'webp')"
                                type="image/webp"
                                media="(min-width: 768px)"
                            />
                        </template>
                        <template v-if="banner.mobileImage">
                            <source :data-srcset="getImageWithRetina(banner.mobileImage)" media="(min-width: 320px)" />
                            <source
                                :data-srcset="getImageWithRetina(banner.mobileImage, 'webp')"
                                type="image/webp"
                                media="(min-width: 320px)"
                            />
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
// import LandingBannerCard from '@components/LandingBannerCard/LandingBannerCard.vue';
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import './SliderBannersSection.css';

const sliderOptions = {
    slidesPerView: 1,
    // grabCursor: true,
    // loop: true,
    // autoplay: {
    //     delay: 10000,
    // },

    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },

    // pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    // },
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

        backgroundColor: {
            type: String,
            default: '#E6E6F0',
        },
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
    },

    methods: {
        mobileImage(banner) {
            const image = banner.mobileImage || banner.tabletImage || banner.desktopImage;
            const imageRetina = banner.mobileImageRetina || banner.tabletImageRetina;
            if (typeof image === 'string')
                return {
                    webp: image.substr(0, image.lastIndexOf('.')) + '.webp',
                    orig: image,
                    retinaWebp:
                        typeof imageRetina === 'string'
                            ? imageRetina.substr(0, imageRetina.lastIndexOf('.')) + '.webp'
                            : undefined,
                    retina: typeof imageRetina === 'string' ? imageRetina : undefined,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(320, 320, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(320, 320, image.id),
                };
        },

        tabletImage(banner) {
            const image = banner.tabletImage || banner.desktopImage;
            const imageRetina = banner.tabletImageRetina || banner.desktopImageRetina;
            if (typeof image === 'string')
                return {
                    webp: image.substr(0, image.lastIndexOf('.')) + '.webp',
                    orig: image,
                    retinaWebp:
                        typeof imageRetina === 'string'
                            ? imageRetina.substr(0, imageRetina.lastIndexOf('.')) + '.webp'
                            : undefined,
                    retina: typeof imageRetina === 'string' ? imageRetina : undefined,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(472, 352, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(472, 352, image.id),
                };
        },

        desktopImage(banner) {
            const image = banner.desktopImage || banner.tabletImage;
            const imageRetina = banner.desktopImageRetina || banner.tabletImageRetina;

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
                    webp: generatePictureSourcePath(600, 888, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(600, 888, image.id),
                };
        },

        defaultImage(banner) {
            const image = banner.desktopImage || banner.tabletImage || banner.mobileImage;
            if (typeof image === 'string') return image;
            if (image) return generatePictureSourcePath(600, 888, image.id);
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
                    imageRetina = image.retina;
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
