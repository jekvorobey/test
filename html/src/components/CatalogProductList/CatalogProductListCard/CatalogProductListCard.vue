<template>
    <router-link
        tag="li"
        class="catalog-product-list-card"
        :class="{ 'catalog-product-list-card--small': isSmall }"
        :to="href"
    >
        <div class="catalog-product-list-card__img" v-once>
            <v-picture v-if="item.image && item.image.id">
                <source :data-srcset="bigImg.webp" type="image/webp" media="(min-width: 480px)" />
                <source :data-srcset="bigImg.orig" media="(min-width: 480px)" />
                <source :data-srcset="smallImg.webp" type="image/webp" media="(max-width: 479px)" />
                <source :data-srcset="smallImg.orig" media="(max-width: 479px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt="" />
            </v-picture>
            <v-svg v-else id="catalog-product-list-card-empty" name="logo" width="48" height="48" />
            <div class="catalog-product-list-card__controls">
                <buy-button
                    v-if="showBuyBtn && !isTablet"
                    class="btn--outline catalog-product-list-card__controls-btn"
                    @click.prevent="onBuyButtonClick"
                >
                    Купить
                </buy-button>
                <v-link tag="button" class="catalog-product-list-card__controls-link" @click.prevent="onPreview">
                    Быстрый&nbsp;просмотр
                </v-link>
            </div>
        </div>
        <div class="catalog-product-list-card__body" v-once>
            <div class="catalog-product-list-card__prices">
                <price class="text-bold catalog-product-list-card__price" v-if="item.price" v-bind="item.price" />
                <price
                    class="text-sm text-grey text-strike catalog-product-list-card__price"
                    v-if="item.oldPrice"
                    v-bind="item.oldPrice"
                />
            </div>
            <div class="link--sm catalog-product-list-card__link">{{ item.name }}</div>
            <div class="catalog-product-list-card__rating" v-once>
                <span
                    v-for="number in 5"
                    class="catalog-product-list-card__rating-star"
                    :class="{ 'catalog-product-list-card__rating-star--empty': number > item.rating }"
                    :key="number"
                />
            </div>
        </div>
        <div class="catalog-product-list-card__tags" v-once>
            <tag
                class="catalog-product-list-card__tags-item"
                v-for="badge in computedBadges"
                :key="badge.id"
                :text="badge.text"
            />
        </div>

        <favorites-button
            class="catalog-product-list-card__wishlist-btn"
            :class="{ 'catalog-product-list-card__wishlist-btn--active': inFavorites }"
            @click="onToggleFavorite"
            :is-active="inFavorites"
        />
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

import { mapGetters } from 'vuex';
import { BADGES_MAP } from '@store/getters';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import { fileExtension } from '@enums';
import { generateProductUrl } from '@util/catalog';
import { generatePictureSourcePath } from '@util/file';

import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/logo.svg';
import './CatalogProductListCard.css';

export default {
    name: 'catalog-product-list-card',

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

        referralCode: {
            type: String,
        },

        isSmall: {
            type: Boolean,
            default: false,
        },

        showWishlistBtn: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        ...mapGetters([BADGES_MAP]),
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        inFavorites() {
            return this[IS_IN_FAVORITES](this.item.productId);
        },

        computedBadges() {
            const { item = {}, badgesMap } = this;
            const { badges = [] } = item;

            const productBadges = badges.filter(code => !!badgesMap[code]).map(code => badgesMap[code]);
            return productBadges.sort((a, b) => {
                return a.order_num - b.order_num;
            });
        },

        showBuyBtn() {
            const { stock: { qty = 0 } = { qty: 0 } } = this.item;
            return qty > 0;
        },

        bigImg() {
            const { image } = this.item;
            return {
                webp: generatePictureSourcePath(300, 300, image.id, fileExtension.image.WEBP),
                orig: generatePictureSourcePath(300, 300, image.id),
            };
        },

        smallImg() {
            const { image } = this.item;
            return {
                webp: generatePictureSourcePath(200, 200, image.id, fileExtension.image.WEBP),
                orig: generatePictureSourcePath(200, 200, image.id),
            };
        },

        defaultImg() {
            const { image } = this.item;
            return generatePictureSourcePath(200, 200, image.id);
        },

        href() {
            return generateProductUrl(
                this.item.categoryCodes[this.item.categoryCodes.length - 1],
                this.item.code,
                this.referralCode
            );
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        onBuyButtonClick() {
            this.$emit('add-item', {
                id: this.item.id,
                storeId: this.item.stock.storeId,
                type: this.item.type,
            });
        },

        onToggleFavorite() {
            this.$emit('toggle-favorite-item', { productId: this.item.productId });
        },

        onPreview() {
            this.$emit('preview', { id: this.item.id, type: this.item.type });
        },
    },
};
</script>
