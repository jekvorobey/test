<template>
    <div class="catalog-banner-card">
        <img class="lazyload blur-up catalog-banner-card__img" :data-src="image" />
        <div class="catalog-banner-card__panel">
            <div v-if="upperText" class="catalog-banner-card__panel-upper-text">
                {{ upperText }}
            </div>
            <div class="catalog-banner-card__panel-title">
                {{ title }}
            </div>
            <div v-if="bottomText" class="catalog-banner-card__panel-bottom-text">
                {{ bottomText }}
            </div>
            <v-button class="btn--outline catalog-banner-card__panel-btn">
                {{ btnText }}
            </v-button>
        </div>
    </div>
</template>

<script>
import VButton from '../controls/VButton/VButton.vue';
import './CatalogBannerCard.css';

export default {
    name: 'catalog-banner-card',

    components: {
        VButton,
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
            type: String,
        },

        btnText: {
            type: String,
        },
    },
};
</script>

