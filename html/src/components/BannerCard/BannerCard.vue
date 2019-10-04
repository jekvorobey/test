<template>
    <div class="banner-card">
        <div class="banner-card__img" to="/">
            <img class="blur-up lazyload" :data-src="image" alt="" />
        </div>

        <div class="banner-card__content">
            <div class="banner-card__content-title">{{ title }}</div>
            <v-button class="banner-card__content-btn">Смотреть товары</v-button>
        </div>
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

