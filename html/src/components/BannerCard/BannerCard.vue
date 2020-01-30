<template>
    <component :is="tag" class="banner-card">
        <div class="banner-card__img">
            <v-picture :image="image" />
            <v-button class="btn--outline banner-card__img-btn" to>{{ buttonText }}</v-button>
        </div>
        <div class="banner-card__title">{{ title }}</div>
    </component>
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

        buttonText: {
            type: String,
            default: 'Перейти',
        },
    },
};
</script>

