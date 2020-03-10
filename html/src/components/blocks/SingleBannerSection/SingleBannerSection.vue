<template>
    <section class="section">
        <div class="container single-banner-section">
            <div class="single-banner-section__inner">
                <catalog-banner-card class="single-banner-section__banner" :item="banner" />
            </div>
        </div>
    </section>
</template>

<script>
import CatalogBannerCard from '../../CatalogBannerCard/CatalogBannerCard.vue';
import './SingleBannerSection.css';

export default {
    name: 'single-banner-section',

    components: {
        CatalogBannerCard,
    },

    props: {
        banner: {
            type: Object,
            default() {
                return {};
            },
        },
    },
};
</script>