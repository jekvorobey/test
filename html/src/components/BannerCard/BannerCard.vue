<template>
    <component :is="tag" class="banner-card" :to="url">
        <div class="banner-card__img">
            <v-picture :key="image.id" v-if="images">
                <slot>
                    <source :data-srcset="images.desktop.webp" type="image/webp" />
                    <source :data-srcset="images.desktop.orig" />
                    <img class="blur-up lazyload v-picture__img" :data-src="images.default" alt="" />
                </slot>
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

import { prepareBannerImage } from '@util/catalog';
import './BannerCard.css';

const desktopSize = { width: 784, height: 480 };

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

            return image && image.id && prepareBannerImage(image, desktopSize);
        },
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
