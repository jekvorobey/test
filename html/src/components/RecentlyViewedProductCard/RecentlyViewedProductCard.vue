<template>
    <router-link tag="a" class="recently-viewed-product-card" :to="href">
        <div class="recently-viewed-product-card__img">
            <v-picture :key="image.id" v-if="images">
                <source :data-srcset="images.desktop.webp" type="image/webp" media="(min-width: 480px)" />
                <source :data-srcset="images.desktop.orig" media="(min-width: 480px)" />
                <source :data-srcset="images.mobile.webp" type="image/webp" media="(max-width: 479px)" />
                <source :data-srcset="images.mobile.orig" media="(max-width: 479px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="images.default" alt="" />
            </v-picture>
            <no-photo-stub v-else />
        </div>
        <div class="recently-viewed-product-card__body">
            <div class="catalog-product-list-card__prices">
               13 000 $
            </div>
            <div class="recently-viewed-product-card__title">
                {{ name }}
            </div>
            <favorites-button
                    class="catalog-product-list-card__wishlist-btn"
                    :class="{ 'catalog-product-list-card__wishlist-btn--active': inFavorites }"
                    @click="onToggleFavorite"
                    :is-active="inFavorites"
            />
        </div>
    </router-link>
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';
import NoPhotoStub from '@components/NoPhotoStub/NoPhotoStub.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';

import './RecentlyViewedProductCard.css';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';
import {mapGetters} from "vuex";
import {NAME as FAVORITES_MODULE} from "@store/modules/Favorites";
import {IS_IN_FAVORITES} from "@store/modules/Favorites/getters";
export default {
    name: 'recently-viewed-product-card',
    components: {
        NoPhotoStub,
        VPicture,
        FavoritesButton,
    },

    props: {
        offerId: {
            type: [String, Number],
        },

        productId: {
            type: [String, Number],
        },

        name: {
            type: String,
        },

        href: {
            type: [Object, String],
            default: '/',
        },

        image: {
            type: Object,
        },
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        inFavorites() {
            return this[IS_IN_FAVORITES](this.productId);
        },
        images() {
            const { image } = this;

            if (image && image.id)
                return {
                    desktop: {
                        webp: generatePictureSourcePath(300, 300, image.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(300, 300, image.id),
                    },

                    mobile: {
                        webp: generatePictureSourcePath(200, 200, image.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(200, 200, image.id),
                    },

                    default: generatePictureSourcePath(200, 200, image.id),
                };

            return null;
        },
    },
    methods: {
        onToggleFavorite() {
            this.$emit('toggle-favorite-item', { productId: this.productId });
        },
    },
};
</script>
