<template>
    <div class="banner-card">
        <div class="banner-card__img">
            <v-picture :image="image" />
            <v-button class="btn--outline banner-card__img-btn" to>{{ buttonText || 'Перейти' }}</v-button>
        </div>
        <div class="banner-card__title">{{ title }}</div>
    </div>
</template>

<script>
import VPicture from '../controls/VPicture/VPicture.vue';
import VButton from '../controls/VButton/VButton.vue';
import './BannerCard.css';

export default {
    name: 'banner-card',

    components: {
        VButton,
        VPicture,
    },

    props: {
        bannerId: {
            type: [Number, String],
        },

        title: {
            type: String,
        },

        image: {
            type: [Object, String],
        },

        buttonText: {
            type: String,
        },
    },
};
</script>

