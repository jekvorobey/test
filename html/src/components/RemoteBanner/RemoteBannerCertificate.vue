<template>
    <div v-if="banner" class="remote-banner">
        <div class="remote-banner__img" @click="isDescriptionOpen = !isDescriptionOpen">
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

        <transition
            name="expand"
            @enter="expandAnimationEnter"
            @after-enter="expandAnimationAfterEnter"
            @leave="expandAnimationLeave"
        >
            <div v-if="isDescriptionOpen">
                <div style="order: 10; padding: 30px 40px">
                    <ol class="list">
                        <li>С 20 декабря 2021 г. по 09 января 2022 г. оформи заказ от 3 000 рублей.</li>
                        <li>
                            Укажи электронную почту в Личном кабинете и дождись объявления номеров заказов победителей
                            января 2022 г.
                        </li>
                        <li>
                            Победители получат подарочный сертификат до 100 000₽ на указанный адрес электронной почты.
                        </li>
                    </ol>
                    <div style="margin-top: 20px">
                        <b><a href="/razygryvaemcertificat-rules/" target="_blank">Посмотреть полные условия</a></b>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
/**
 * Костыльный компонент исключительно для конкретного баннера
 */
import { generatePictureSourcePath } from '@util/file';
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
            isDescriptionOpen: false,
            fileExtension,
        };
    },

    computed: {
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

        expandAnimationEnter(element) {
            const width = getComputedStyle(element).width;

            element.style.width = width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';

            const height = getComputedStyle(element).height;

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
            const height = getComputedStyle(element).height;

            element.style.height = height;

            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = 0;
            });
        },
    },
};
</script>

<style scoped>
.remote-banner {
    flex-flow: column;
    cursor: auto;
}

.remote-banner .remote-banner__img {
    cursor: pointer;
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
