<template>
    <div :class="{'banner-through__active': banners}"
         class="banner-through"
    >
        <v-slider :options="sliderOptions"
                  :controls="false"
                  name="through-slider-banner"
                  class="banner-through__swiper"
        >
            <v-link
                    v-for="item in items"
                    :key="item.id"
                    :to="item.url"
                    class="swiper-slide"
            >
                <template v-if="item.desktopImage">
                    <source
                            :data-srcset="getImageWithRetina(item.desktopImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 1024px)"
                    />
                    <source
                            :data-srcset="getImageWithRetina(item.desktopImage)"
                            media="(min-width: 1024px)"
                    />
                </template>
                <template v-if="item.tabletImage">
                    <source
                            :data-srcset="getImageWithRetina(item.tabletImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 768px)"
                    />
                    <source :data-srcset="getImageWithRetina(item.tabletImage)" media="(min-width: 768px)"/>
                </template>
                <template v-if="item.mobileImage">
                    <source
                            :data-srcset="getImageWithRetina(item.mobileImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 320px)"
                    />
                    <source :data-srcset="getImageWithRetina(item.mobileImage)" media="(min-width: 320px)"/>
                </template>
                <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="item.defaultImage"
                        alt=""
                        loading="lazy"
                />
            </v-link>
        </v-slider>
    </div>
</template>

<script>
    import {getBannersByCode} from "@api";
    import {bannerType, fileExtension} from "@enums";
    import './BannerThrough.css'

    import VSlider from "@controls/VSlider/VSlider.vue";
    import VLink from "@controls/VLink/VLink.vue";
    import {generatePictureSourcePath} from "@util/file";

    const sliderOptions = {
        autoplay: {
            delay: 2000,
        },
    }

    export default {
        name: "BannerThrough",
        components: {VSlider, VLink},
        data() {
            return {
                banners: null,
                desktopSize: [1224, 420],
                tabletSize: [1024, 533],
                mobileSize: [768, 653],
            }
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
        computed: {
            sliderOptions() {
                return sliderOptions;
            },
            items() {
                return this.banners && this.banners.map(b => ({
                    ...b,
                    mobileImage: this.mobileImage(b),
                    tabletImage: this.tabletImage(b),
                    desktopImage: this.desktopImage(b),
                    defaultImage: this.defaultImage(b),
                }));
            }
        },
        watch: {
            banners(){
                if(this.banners && this.banners.length > 0) {
                    this.$emit('isBannerThrough')
                }
            }
        },
        async beforeCreate() {
            this.banners = await getBannersByCode(bannerType.THROUGH, false, this.$route.path);
        },
    }
</script>