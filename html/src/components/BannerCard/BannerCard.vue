<template>
    <component :is="tag" class="banner-card" :to="url">
        <div class="banner-card__img">
            <v-picture :key="image.id" v-if="images">
                <source :data-srcset="images.desktop.webp" type="image/webp" />
                <source :data-srcset="images.desktop.orig" />
                <img class="blur-up lazyload v-picture__img" :data-src="images.default" alt="" />
            </v-picture>
            <v-picture v-else :image="image" />
            <v-button class="btn--outline banner-card__img-btn" v-if="isMounted" :to="to">
                {{ buttonText }}
            </v-button>
        </div>
        <div class="banner-card__title">{{ title }}</div>
    </component>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';
import VButton from '@controls/VButton/VButton.vue';

import { generatePictureSourcePath } from '@util/file';
import { fileExtension } from '@enums';
import './BannerCard.css';

export default {
    name: 'banner-card',

    components: {
        VButton,
        VPicture,
    },

    props: {
        tag: {
            type: String,
            default: 'div',
        },

        bannerId: {
            type: [Number, String],
        },

        title: {
            type: String,
        },

        image: {
            type: [Object, String],
        },

        to: {
            type: [Object, String],
            default: '/',
        },

        buttonText: {
            type: String,
            default: 'Перейти',
        },
    },

    data() {
        return {
            isMounted: false,
        };
    },

    computed: {
        url() {
            const { tag, to } = this;
            return tag === 'router-link' ? to : null;
        },

        images() {
            const { image } = this;

            if (image && image.id)
                return {
                    desktop: {
                        webp: generatePictureSourcePath(392, 240, image.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(392, 240, image.id),
                    },
                    default: generatePictureSourcePath(392, 240, image.id),
                };
        },
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
