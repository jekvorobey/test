<template>
    <router-link tag="div" class="catalog-product-card" :class="{ 'catalog-product-card--small': isSmall }" :to="href">
        <div class="catalog-product-card__img">
            <v-picture :key="image.id" v-if="image && image.id">
                <source v-if="bigImg" :data-srcset="bigImg" type="image/webp" media="(min-width: 480px)" />
                <source v-if="smallImg" :data-srcset="smallImg" type="image/webp" media="(max-width: 479px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt="" />
            </v-picture>
            <v-svg v-else id="catalog-product-card-empty" name="logo" width="48" height="48" />
            <div class="catalog-product-card__controls">
                <buy-button
                    v-if="showBuyBtn"
                    class="btn--outline catalog-product-card__controls-btn"
                    @click.prevent="onBuyButtonClick"
                >
                    Купить
                </buy-button>
                <v-link tag="button" class="catalog-product-card__controls-link" @click.prevent="onPreview">
                    Быстрый&nbsp;просмотр
                </v-link>
            </div>
        </div>
        <div class="catalog-product-card__body">
            <div class="catalog-product-card__prices">
                <price class="text-bold catalog-product-card__price" v-if="price" v-bind="price" />
                <price
                    class="text-sm text-grey text-strike catalog-product-card__price"
                    v-if="oldPrice"
                    v-bind="oldPrice"
                />
            </div>
            <div class="link--sm catalog-product-card__link">{{ name }}</div>
            <v-rating class="catalog-product-card__rating" :value="rating" readonly>
                <template v-slot:activeLabel>
                    <v-svg name="star-small" width="16" height="16" />
                </template>
                <template v-slot:inactiveLabel>
                    <v-svg name="star-empty-small" width="16" height="16" />
                </template>
            </v-rating>
        </div>
        <div class="catalog-product-card__tags">
            <tag class="catalog-product-card__tags-item" v-for="tag in tags" :key="tag.id" :text="tag.name" />
        </div>
        <favorites-button class="catalog-product-card__wishlist-btn"  :isActive="inFavorites" @click.prevent="onFavoritesBtnClick" v-if="showWishlistBtn" >
        </favorites-button>
    </router-link>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VRating from '@controls/VRating/VRating.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Tag from '@components/Tag/Tag.vue';
import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';

import { mapGetters, mapActions, mapState } from 'vuex';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';

import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import './CatalogProductCard.css';

export default {
    name: 'catalog-product-card',

    components: {
        VSvg,
        VLink,
        VRating,
        VPicture,

        Tag,
        Price,
        BuyButton,
        FavoritesButton,
    },

    props: {
        tags: {
            type: Array,
            default() {
                return [];
            },
        },

        productId: {
            type: [String, Number],
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        href: {
            type: [Object, String],
            default: '/',
        },

        image: {
            type: [String, Object],
        },

        rating: {
            type: Number,
            default: 0,
        },

        price: {
            type: [Object, String],
        },

        oldPrice: {
            type: [Object, String],
        },

        isSmall: {
            type: Boolean,
            default: false,
        },

        showBuyBtn: {
            type: Boolean,
            default: false,
        },

        showWishlistBtn: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        isObjectImage() {
            return this.image && this.image.id;
        },

        bigImg() {
            return (
                (this.isObjectImage && generatePictureSourcePath(300, 300, this.image.id, fileExtension.image.WEBP)) ||
                this.image
            );
        },

        smallImg() {
            return (
                (this.isObjectImage && generatePictureSourcePath(200, 200, this.image.id, fileExtension.image.WEBP)) ||
                this.image
            );
        },

        defaultImg() {
            return (
                (this.isObjectImage && generatePictureSourcePath(200, 200, this.image.id, this.image.sourceExt)) ||
                this.image
            );
        },

        inFavorites() {
            return this[IS_IN_FAVORITES](this.productId);
        },
    },

    methods: {
        onBuyButtonClick() {
            this.$emit('add-item', { id: this.productId, type: this.type });
        },

        onFavoritesBtnClick() {
            this.$emit('add-favorites-item', { id: this.productId });
        },

        onPreview() {
            this.$emit('preview', { id: this.productId, type: this.type });
        },

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },
};
</script>
