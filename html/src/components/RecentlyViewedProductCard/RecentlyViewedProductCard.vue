<template>
    <router-link tag="a" class="catalog-product-list-card recently-viewed-product-card" :to="href">
        <div class="recently-viewed-product-card__img">
            <v-picture :key="image.id" v-if="images">
                <source :data-srcset="images.desktop.webp" type="image/webp" media="(min-width: 480px)" />
                <source :data-srcset="images.desktop.orig" media="(min-width: 480px)" />
                <source :data-srcset="images.mobile.webp" type="image/webp" media="(max-width: 479px)" />
                <source :data-srcset="images.mobile.orig" media="(max-width: 479px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="images.default" alt="" />
            </v-picture>
            <no-photo-stub v-else />

            <div v-if="!isTabletLg" class="catalog-product-list-card__controls" v-once>
                <buy-button
                        v-if="showBuyBtn"
                        class="btn--outline catalog-product-list-card__controls-btn"
                        @click.prevent="onBuyButtonClick"
                >
                    Купить
                </buy-button>
                <v-link tag="button" class="catalog-product-list-card__controls-link" @click.prevent="onPreview">
                    Быстрый&nbsp;просмотр
                </v-link>
            </div>

            <div
                    v-if="$mq.tablet"
                    class="catalog-product-list-card__mobile-cart-btn"
                    @click.prevent.stop="onBuyButtonClick"
            >
                <v-spinner v-if="this.isBuyButtonClicked && !inCart" width="24" height="24" show/>
                <v-link tag="button">
                    <transition name="fade-absolute">
                        <v-svg v-if="inCart" name="cart-filled" key="cart-filled" width="24" height="24" />
                        <v-svg v-else name="cart" key="cart" width="24" height="24" />
                    </transition>
                </v-link>
            </div>

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
import VLink from '@controls/VLink/VLink.vue';
import NoPhotoStub from '@components/NoPhotoStub/NoPhotoStub.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';

import './RecentlyViewedProductCard.css';
import {mapGetters} from "vuex";
import {NAME as FAVORITES_MODULE} from "@store/modules/Favorites";
import {IS_IN_FAVORITES} from "@store/modules/Favorites/getters";
export default {
    name: 'recently-viewed-product-card',
    components: {
        NoPhotoStub,
        VLink,
        VPicture,
        BuyButton,
        FavoritesButton,
        VSpinner,
    },

    data(){
        return{
            isBuyButtonClicked: false,
        }
    },


    props: {
        item: {
            type: Object,
            default() {
                return {
                    categoryCodes: [],
                    tags: [],
                    stocks: { qty: 0 },
                    badges: [],
                };
            },
        },

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

        inCart: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        inFavorites() {
            return this[IS_IN_FAVORITES](this.productId);
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        showBuyBtn() {
            const { stock: { qty = 0 } = { qty: 0 } } = this.item;
            return qty > 0;
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

        onBuyButtonClick() {
            this.isBuyButtonClicked = true;

            this.$emit('add-item', {
                id: this.item.id,
                storeId: this.item.stock.storeId,
                type: this.item.type,
            });
        },

        onPreview() {
            this.$emit('preview', { id: this.item.id, type: this.item.type });
        },
    },
};
</script>
