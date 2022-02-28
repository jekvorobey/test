<template>
    <section class="section">
        <div class="container products-section" :class="{ 'products-section--inverse': inverse }">
            <h2 class="products-section__hl">{{ titleText }}</h2>

            <div class="products-section__grid">
                <catalog-product-card
                    class="products-section__card"
                    v-for="(item, index) in items"
                    :key="item.id"
                    :offer-id="item.id"
                    :product-id="item.productId"
                    :name="item.name"
                    :type="item.type"
                    :href="`/product/${item.code}`"
                    :image="item.image"
                    :price="item.price"
                    :old-price="item.oldPrice"
                    :badges="item.badges"
                    :rating="item.rating"
                    :is-price-hidden="item.isPriceHidden"
                    :show-buy-btn="item.stock.qty > 0"
                    @add-item="onAddToCart(item)"
                    @preview="onPreview(item.code)"
                    @toggle-favorite-item="onToggleFavorite(item)"
                    @click-event-triggered="registerSeoEvent(item, index)"
                />

                <catalog-banner-card class="products-section__banner" :item="banner">
                    <template v-if="desktopImage">
                        <!-- <source
                            :data-srcset="getImageWithRetina(desktopImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 1024px)"
                        /> -->
                        <source :data-srcset="getImageWithRetina(desktopImage)" media="(min-width: 1024px)" />
                    </template>
                    <template v-if="tabletImage">
                        <!-- <source
                            :data-srcset="getImageWithRetina(tabletImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 768px)"
                        /> -->
                        <source :data-srcset="getImageWithRetina(tabletImage)" media="(min-width: 768px)" />
                    </template>
                    <template v-if="mobileImage">
                        <!-- <source
                            :data-srcset="getImageWithRetina(mobileImage, 'webp')"
                            type="image/webp"
                            media="(min-width: 320px)"
                        /> -->
                        <source :data-srcset="getImageWithRetina(mobileImage)" media="(min-width: 320px)" />
                    </template>
                    <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
                </catalog-banner-card>

                <div class="container container--tablet products-section__controls" v-if="btnLink !== '/'">
                    <v-button class="btn--outline products-section__link" :to="btnLink">
                        {{ btnText }}
                    </v-button>
                </div>
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
import { seoEvents, ProductsBuilder } from '@services/SeoEventsService';
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
            const imageRetina = this.banner.mobileImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image.substr(0, image.lastIndexOf('.')) + '.webp',
                    orig: image,
                    retinaWebp:
                        typeof imageRetina === 'string'
                            ? imageRetina.substr(0, imageRetina.lastIndexOf('.')) + '.webp'
                            : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(320, 320, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(320, 320, image.id),
                };
        },

        tabletImage() {
            const image = this.banner.tabletImage || this.banner.desktopImage;
            const imageRetina = this.banner.tabletImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image.substr(0, image.lastIndexOf('.')) + '.webp',
                    orig: image,
                    retinaWebp:
                        typeof imageRetina === 'string'
                            ? imageRetina.substr(0, imageRetina.lastIndexOf('.')) + '.webp'
                            : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(472, 352, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(472, 352, image.id),
                };
        },

        desktopImage() {
            const image = this.banner.desktopImage || this.banner.tabletImage;
            const imageRetina = this.banner.desktopImageRetina || this.banner.tabletImage;

            if (typeof image === 'string')
                return {
                    webp: image.substr(0, image.lastIndexOf('.')) + '.webp',
                    orig: image,
                    retinaWebp:
                        typeof imageRetina === 'string'
                            ? imageRetina.substr(0, imageRetina.lastIndexOf('.')) + '.webp'
                            : undefined,
                    retinaOrig: typeof imageRetina === 'string' ? imageRetina : undefined,
                };

            if (image)
                return {
                    webp: generatePictureSourcePath(600, 888, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(600, 888, image.id),
                };
        },

        defaultImage() {
            const image = this.banner.desktopImage || this.banner.tabletImage || this.banner.mobileImage;
            if (typeof image === 'string') return image;
            if (image) return generatePictureSourcePath(600, 888, image.id);
        },
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        onAddToCart(item) {
            const { code, type, stock, id, variantGroups } = item;

            if (variantGroups) this.onPreview(code);
            else
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.ADD_TO_CART,
                    open: true,
                    state: { offerId: id, storeId: stock && stock.storeId, type },
                });
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.QUICK_VIEW,
                open: true,
                state: { code },
            });
        },

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        getImageWithRetina(image, type = 'jpg') {
            let result = '';
            let imageOrig = '';
            let imageRetina = '';

            switch (type) {
                case 'webp':
                    imageOrig = image.webp;
                    imageRetina = image.retinaWebp;
                    break;
                default:
                    imageOrig = image.orig;
                    imageRetina = image.retinaOrig;
            }

            result += `${imageOrig} 1x`;
            if (imageRetina) {
                result += `, ${imageRetina} 2x`;
            }
            return result;
        },

        registerSeoEvent(item, index) {
            const params = { ...item, position: index + 1 };
            const products = new ProductsBuilder().createForCatalogCardClick(params);
            seoEvents.click(products, 'Homepage');
        },
    },
};
</script>
