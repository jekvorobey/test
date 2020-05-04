<template>
    <section class="section">
        <div class="container list-banners-section">
            <div class="list-banners-section__list">
                <banner-card
                    class="list-banners-section__list-item"
                    v-for="banner in banners"
                    :key="banner.id"
                    :image="banner.image"
                    :title="banner.title"
                    :button-text="banner.btnText"
                />
            </div>
        </div>
    </section>
</template>

<script>
import BannerCard from '@components/BannerCard/BannerCard.vue';
import './ListBannersSection.css';

export default {
    name: 'list-banners-section',

    components: {
        BannerCard,
    },

    props: {
        banners: {
            type: Array,
            default() {
                return [];
            },
        },
    },
};
</script>
