<template>
    <div class="return-result-card" :class="className">
        <router-link class="return-result-card__img" :to="href">
            <v-picture v-if="image" :image="image" alt>
                <template v-slot:source="{ image }">
                    <source :data-srcset="generateSourcePath(64, 64, image.id, 'webp')" type="image/webp" />
                </template>
                <template v-slot:fallback="{ image, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(64, 64, image.id)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
            <v-svg v-else id="return-result-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="return-result-card__body">
            <div class="return-result-card__title">
                <v-link class="return-result-card__body-name" :to="href">{{ name }}</v-link>
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VButton from '@controls/VButton/VButton.vue';

import { generatePictureSourcePath } from '@util/file';
import './ReturnResultCard.css';

export default {
    name: 'return-result-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VButton,
    },

    props: {
        className: {
            type: String,
            default: '',
        },

        href: {
            type: String,
            default: '/',
        },

        id: {
            type: Number,
            required: true,
        },

        image: {
            type: Object,
        },

        name: {
            type: String,
        },
    },

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },
};
</script>
