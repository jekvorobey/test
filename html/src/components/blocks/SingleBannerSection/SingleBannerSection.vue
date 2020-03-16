<template>
    <section class="section">
        <div class="container single-banner-section">
            <div class="single-banner-section__inner">
                <catalog-banner-card class="single-banner-section__banner" :item="banner">
                    <source v-if="desktopImg" :data-srcset="desktopImg" type="image/webp" media="(min-width: 1024px)" />
                    <source v-if="tabletImg" :data-srcset="tabletImg" type="image/webp" media="(min-width: 480px)" />
                    <source v-if="mobileImg" :data-srcset="mobileImg" type="image/webp" media="(max-width: 479px)" />
                    <img v-if="defaultImg" class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt="" />
                </catalog-banner-card>
            </div>
        </div>
    </section>
</template>

<script>
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';
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

    computed: {
        mobileImg() {
            const image = this.banner.mobileImage || this.banner.tabletImage || this.banner.desktopImage;
            if (image) return generatePictureSourcePath(320, 240, image.id, 'webp');
        },

        tabletImg() {
            const image = this.banner.tabletImage || this.banner.desktopImage;
            if (image) return generatePictureSourcePath(768, 240, image.id, 'webp');
        },

        desktopImg() {
            const image = this.banner.desktopImage || this.banner.tabletImage;
            if (image) return generatePictureSourcePath(1224, 240, image.id, 'webp');
        },

        defaultImg() {
            const image = this.banner.desktopImage || this.banner.tabletImage || this.banner.mobileImage;
            if (image) return generatePictureSourcePath(1224, 240, image.id, image.sourceExt);
        },
    },
};
</script>