<template>
    <div class="instagram-card">
        <div class="instagram-card__img" to="/">
            <img class="blur-up lazyload" :data-src="image" alt="" />
        </div>

        <div class="instagram-card__content">
            <v-svg class="instagram-card__content-img" name="instagram-bw" width="24" height="24" />
            <v-button class="instagram-card__content-btn">{{ buttonText }}</v-button>
        </div>
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VButton from '../controls/VButton/VButton.vue';

import '../../assets/images/sprites/socials/instagram-bw.svg';
import './InstagramCard.css';

export default {
    name: 'instagram-card',

    components: {
        VSvg,
        VButton,
    },

    props: {
        instagramCardId: {
            type: [Number, String],
        },

        image: {
            type: String,
        },

        buttonText: {
            type: String,
            default: 'Купить',
        },
    },
};
</script>

