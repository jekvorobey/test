<template>
    <component :is="tag" class="banner-card">
        <div class="banner-card__img">
            <v-picture :key="image.id" v-if="image && image.id">
                <source :data-srcset="desktopImage" type="image/webp" media="(min-width: 480px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
            </v-picture>
            <v-picture v-else :image="image" />
            <v-button class="btn--outline banner-card__img-btn" :to="to">{{ buttonText }}</v-button>
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

    computed: {
        desktopImage() {
            if (this.image && this.image.id)
                return generatePictureSourcePath(400, 240, this.image.id, fileExtension.image.WEBP);
        },

        defaultImage() {
            if (this.image && this.image.id)
                return generatePictureSourcePath(400, 240, this.image.id, this.image.sourceExt);
        },
    },
};
</script>
