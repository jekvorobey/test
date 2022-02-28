<template>
    <component v-if="banner" :is="bannerComponent" class="remote-banner" v-bind="bannerProperties">
        <div class="remote-banner__img">
            <v-picture :key="banner.id">
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

                <img class="blur-up lazyload v-picture__img" :data-src="defaultImage.original" alt="" />
            </v-picture>
        </div>
    </component>
</template>

<script>
import { generatePictureSourcePath } from '@util/file';
import { isExternalUrl } from '@util/router';
import { fileExtension } from '@enums';

import VPicture from '@controls/VPicture/VPicture.vue';

import './RemoteBanner.css';

export default {
    name: 'remote-banner',

    components: {
        VPicture,
    },

    props: {
        banner: {
            type: Object,
            required: true,
        },

        desktopSize: {
            type: Array,
            required: true,
        },

        tabletSize: {
            type: Array,
            required: true,
        },

        mobileSize: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            isMounted: false,
            fileExtension,
        };
    },

    computed: {
        bannerComponent() {
            return this.isExternal ? 'a' : 'router-link';
        },

        bannerProperties() {
            if (this.isExternal) {
                return {
                    href: this.banner.url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                };
            }

            return {
                tag: 'a',
                to: this.banner.url || this.$route.fullPath,
            };
        },

        isExternal() {
            return isExternalUrl(this.banner.url);
        },

        desktopImage() {
            if (this.banner.desktopImage) {
                return this.resize(this.banner.desktopImage, this.desktopSize);
            }

            return null;
        },

        tabletImage() {
            if (this.banner.tabletImage) {
                return this.resize(this.banner.tabletImage, this.tabletSize);
            }

            return null;
        },

        mobileImage() {
            if (this.banner.mobileImage) {
                return this.resize(this.banner.mobileImage, this.mobileSize);
            }

            return null;
        },

        defaultImage() {
            return this.desktopImage;
        },
    },

    mounted() {
        this.isMounted = true;
    },

    methods: {
        getImageWithRetina(image, type = 'jpg') {
            let result = '';
            let imageOrig = '';
            let imageRetina = '';

            switch (type) {
                case 'webp':
                    imageOrig = image.originalWebp;
                    imageRetina = image.retinaWebp;
                    break;
                default:
                    imageOrig = image.original;
                    imageRetina = image.retina;
            }

            result += `${imageOrig} 1x`;
            if (imageRetina) {
                result += `, ${imageRetina} 2x`;
            }
            return result;
        },

        resize(image, sizes) {
            return {
                original: generatePictureSourcePath(sizes[0], sizes[1], image.id, image.sourceExt),
                originalWebp: generatePictureSourcePath(sizes[0], sizes[1], image.id, fileExtension.image.WEBP),
                retina: generatePictureSourcePath(sizes[0] * 2, sizes[1] * 2, image.id, image.sourceExt),
                retinaWebp: generatePictureSourcePath(sizes[0] * 2, sizes[1] * 2, image.id, fileExtension.image.WEBP),
            };
        },
    },
};
</script>