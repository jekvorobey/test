<template>
    <div class="banner-card">
        <div class="banner-card__img" to="/">
            <img class="blur-up lazyload" :data-src="image" alt="" />
            <v-button class="btn--outline banner-card__img-btn" to>{{ buttonText || 'Перейти' }}</v-button>
        </div>
        <div class="banner-card__title">{{ title }}</div>
    </div>
</template>

<script>
import VButton from '../controls/VButton/VButton.vue';
import './BannerCard.css';

export default {
    name: 'banner-card',

    components: {
        VButton,
    },

    props: {
        bannerId: {
            type: [Number, String],
        },

        title: {
            type: String,
        },

        image: {
            type: String,
        },

        buttonText: {
            type: String,
        },
    },
};
</script>

