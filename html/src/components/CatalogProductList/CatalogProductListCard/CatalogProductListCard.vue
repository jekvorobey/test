<template>
    <router-link
        tag="li"
        class="catalog-product-list-card"
        :class="{ 'catalog-product-list-card--small': isSmall }"
        :to="href"
    >
        <div class="catalog-product-list-card__img" v-once>
            <v-picture v-if="item.image && item.image.id">
                <source :data-srcset="bigImg" type="image/webp" media="(min-width: 480px)" />
                <source :data-srcset="smallImg" type="image/webp" media="(max-width: 479px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt="" />
            </v-picture>
            <v-svg v-else id="catalog-product-list-card-empty" name="logo" width="48" height="48" />
            <div class="catalog-product-list-card__controls">
                <v-button
                    v-if="showBuyBtn"
                    class="btn--outline catalog-product-list-card__controls-btn"
                    @click.prevent="onBuyButtonClick"
                >
                    Купить
                </v-button>
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
            <tag class="catalog-product-list-card__tags-item" v-for="tag in item.tags" :key="tag.id" :text="tag.name" />
        </div>
        <v-link v-if="showWishlistBtn" tag="button" class="catalog-product-list-card__wishlist-btn" @click.prevent>
            <v-svg name="wishlist-middle" width="24" height="24" />
        </v-link>
    </router-link>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VRating from '@controls/VRating/VRating.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Tag from '@components/Tag/Tag.vue';
import Price from '@components/Price/Price.vue';

import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import './CatalogProductListCard.css';

import { generatePictureSourcePath } from '@util/media';

export default {
    name: 'catalog-product-list-card',

    components: {
        VSvg,
        VLink,
        VButton,
        VRating,
        VPicture,

        Tag,
        Price,
    },

    props: {
        item: {
            type: Object,
            default() {
                return {
                    categoryCodes: [],
                    tags: [],
                    stocks: { qty: 0 },
                };
            },
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
        showBuyBtn() {
            const { stock: { qty = 0 } = { qty: 0 } } = this.item;
            return qty > 0;
        },

        bigImg() {
            return generatePictureSourcePath(300, 300, this.item.image.id, 'webp');
        },

        smallImg() {
            return generatePictureSourcePath(200, 200, this.item.image.id, 'webp');
        },

        defaultImg() {
            return generatePictureSourcePath(200, 200, this.item.image.id, this.item.image.sourceExt);
        },

        href() {
            if (!this.item.categoryCodes || this.item.categoryCodes.length === 0) return '/catalog';
            return `/catalog/${this.item.categoryCodes[this.item.categoryCodes.length - 1]}/${this.item.code}`;
        },
    },

    methods: {
        onBuyButtonClick() {
            this.$emit('addItem', {
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
