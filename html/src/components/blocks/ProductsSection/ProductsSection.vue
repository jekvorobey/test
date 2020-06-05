<template>
    <section class="section">
        <div class="container products-section" :class="{ 'products-section--inverse': inverse }">
            <h2 class="products-section__hl">{{ titleText }}</h2>

            <div class="products-section__grid">
                <div class="products-section__cards">
                    <catalog-product-card
                        class="products-section__card"
                        v-for="item in items"
                        :key="item.id"
                        :offer-id="item.id"
                        :product-id="item.productId"
                        :name="item.name"
                        :type="item.type"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        @add-item="onAddToCart(item)"
                        @preview="onPreview(item.code)"
                        @toggle-favorite-item="onToggleFavorite(item)"
                    />
                    <!-- #58322  -->
                    <!-- <v-button class="btn--outline products-section__link" :to="btnLink">
                        {{ btnText }}
                    </v-button> -->
                </div>

                <catalog-banner-card class="products-section__banner" :item="banner">
                    <template v-if="desktopImage">
                        <source :data-srcset="desktopImage.webp" type="image/webp" media="(min-width: 1024px)" />
                        <source :data-srcset="desktopImage.orig" media="(min-width: 1024px)" />
                    </template>
                    <template v-if="tabletImage">
                        <source :data-srcset="tabletImage.webp" type="image/webp" media="(min-width: 768px)" />
                        <source :data-srcset="tabletImage.orig" media="(min-width: 768px)" />
                    </template>
                    <template v-if="mobileImage">
                        <source :data-srcset="mobileImage.webp" type="image/webp" media="(min-width: 320px)" />
                        <source :data-srcset="mobileImage.orig" media="(min-width: 320px)" />
                    </template>
                    <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
                </catalog-banner-card>
            </div>
        </div>
    </section>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';

import { mapActions } from 'vuex';
import { NAME as CART_MODULE } from '@store/modules/Cart';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { fileExtension, modalName } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import './ProductsSection.css';

export default {
    name: 'products-section',
    components: {
        VButton,
        CatalogProductCard,
        CatalogBannerCard,
    },

    props: {
        titleText: {
            type: String,
            default: 'Title',
        },

        btnText: {
            type: String,
            default: 'Посмотреть все',
        },

        btnLink: {
            type: String,
            default: '/',
        },

        inverse: {
            type: Boolean,
            default: false,
        },

        items: {
            type: Array,
            default() {
                return [];
            },
        },

        banner: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    computed: {
        mobileImage() {
            const image = this.banner.mobileImage || this.banner.tabletImage || this.banner.desktopImage;
            if (image)
                return {
                    webp: generatePictureSourcePath(320, 320, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(320, 320, image.id),
                };
        },

        tabletImage() {
            const image = this.banner.tabletImage || this.banner.desktopImage;
            if (image)
                return {
                    webp: generatePictureSourcePath(472, 352, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(472, 352, image.id),
                };
        },

        desktopImage() {
            const image = this.banner.desktopImage || this.banner.tabletImage;
            if (image)
                return {
                    webp: generatePictureSourcePath(600, 888, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(600, 888, image.id),
                };
        },

        defaultImage(item) {
            const image = this.banner.desktopImage || this.banner.tabletImage || this.banner.mobileImage;
            if (image) return generatePictureSourcePath(600, 888, image.id);
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: 'quick-view-modal', open: true, state: { code } });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.ADD_TO_CART,
                open: true,
                state: { offerId: item.id, storeId: item.stock.storeId, type: item.type },
            });
        },

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },
    },
};
</script>
