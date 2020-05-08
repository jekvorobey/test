<template>
    <div class="landing-banner-card">
        <div class="landing-banner-card__img">
            <v-picture v-if="image" :image="image" alt="" :lazy="false">
                <template v-slot:source="{ image, lazy }">
                    <source
                        :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                        type="image/webp"
                        media="(min-width: 1024px)"
                    />
                </template>
                <template v-slot:fallback="{ image, lazy, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(300, 300, image.id)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
        </div>
        <div class="landing-banner-card__panel">
            <div class="landing-banner-card__panel-container">
                <div class="landing-banner-card__panel-title">
                    <div class="landing-banner-card__panel-title-text">{{ title }}</div>
                    <v-button class="landing-banner-card__panel-btn btn--big" to="/?registration=true">
                        {{ btnText }}
                    </v-button>
                </div>
                <div v-if="bottomText" class="landing-banner-card__panel-bottom-text">
                    <div>
                        <span style="font-size: 24px; line-height: 32px;">01</span>
                        <p>Регистрируйся и укажи ссылку на свой профиль в социальных сетях</p>
                        <span style="font-size: 24px; line-height: 32px;">02</span>
                        <p>В течение 24 часов мы проверим твоё портфолио</p>
                        <span style="font-size: 24px; line-height: 32px;">03</span>
                        <p>Ты получишь доступ к тысячам товаров по специальным ценам</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import { generatePictureSourcePath } from '@util/file';
import './LandingBannerCard.css';

export default {
    name: 'landing-banner-card',

    components: {
        VButton,
        VPicture,
    },

    props: {
        bannerId: {
            type: [Number, String],
        },

        upperText: {
            type: String,
        },

        bottomText: {
            type: String,
        },

        title: {
            type: String,
        },

        image: {
            type: [Object, String],
        },

        btnText: {
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
