<template>
    <component
        v-if="banner"
        :is="bannerComponent"
        class="remote-banner"
        :style="cssVariables"
        v-bind="bannerProperties"
    >
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

            <button
                v-if="hasAdditionalText"
                type="button"
                class="remote-banner__description-switcher"
                @click="toggleDescription"
            >
                Полные условия
            </button>
        </div>

        <transition
            v-if="hasAdditionalText"
            name="expand"
            @enter="expandAnimationEnter"
            @after-enter="expandAnimationAfterEnter"
            @leave="expandAnimationLeave"
        >
            <div v-if="isDescriptionOpen">
                <div class="remote-banner__description" v-html="banner.additional_text"></div>
            </div>
        </transition>
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
            isDescriptionOpen: this.$route.query.isOpen === 'true',
            fileExtension,
        };
    },

    computed: {
        bannerComponent() {
            if (!this.hasUrl) {
                return 'div';
            }

            return this.isExternal ? 'a' : 'router-link';
        },

        bannerProperties() {
            if (!this.hasUrl) {
                return {};
            }

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

        hasAdditionalText() {
            return Boolean(this.banner.additional_text);
        },

        hasUrl() {
            return this.banner.url && this.banner.url.length > 0;
        },

        bannerControlsColor() {
            if (typeof this.banner.controls_color !== 'undefined' && this.banner.controls_color) {
                return this.banner.controls_color;
            }

            return '#000000';
        },

        cssVariables() {
            return {
                '--remote-banner-controls-color': this.bannerControlsColor,
            };
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

        expandAnimationEnter(element) {
            element.style.width = getComputedStyle(element).width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const { height } = getComputedStyle(element);

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = height;
            });
        },

        expandAnimationAfterEnter(element) {
            element.style.height = 'auto';
        },

        expandAnimationLeave(element) {
            element.style.height = getComputedStyle(element).height;

            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = 0;
            });
        },

        toggleDescription(event) {
            event.preventDefault();
            event.stopPropagation();

            this.isDescriptionOpen = !this.isDescriptionOpen;
        },

        closeDescription() {
            this.isDescriptionOpen = false;
        },
    },
};
</script>

<style scoped>
.remote-banner {
  flex-flow: column;
  cursor: auto;
}

.expand-enter-active,
.expand-leave-active {
  transition: height 500ms ease-in-out;
  overflow: hidden;
  transition-property: opacity, height;
}

.expand-enter,
.expand-leave-to {
  height: 0;
  opacity: 0;
}
</style>
