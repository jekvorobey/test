<template>
    <div class="catalog-product-card" :class="{ 'catalog-product-card--small': isSmall }">
        <div class="catalog-product-card__img">
            <v-picture v-if="image" :image="image" alt="">
                <template v-slot:source="{ image, lazy }">
                    <source
                        :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                        type="image/webp"
                        media="(min-width: 480px)"
                    />
                    <source
                        :data-srcset="generateSourcePath(200, 200, image.id, 'webp')"
                        type="image/webp"
                        media="(max-width: 479px)"
                    />
                </template>
                <template v-slot:fallback="{ image, lazy, alt }">
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="generateSourcePath(300, 300, image.id, image.sourceExt)"
                        :alt="alt"
                    />
                </template>
            </v-picture>
            <v-svg v-else id="catalog-product-card-empty" name="logo" width="48" height="48" />
            <div class="catalog-product-card__controls">
                <v-button class="btn--outline catalog-product-card__controls-btn" @click="onBuyButtonClick">
                    Купить
                </v-button>
                <v-link tag="button" class="catalog-product-card__controls-link">Быстрый просмотр</v-link>
            </div>
        </div>
        <div class="catalog-product-card__body">
            <div class="catalog-product-card__prices">
                <div class="text-bold catalog-product-card__price">{{ oldPrice ? `от ${price}` : price }}</div>
                <div v-show="oldPrice" class="text-sm text-grey text-strike catalog-product-card__price">
                    от {{ oldPrice }}
                </div>
            </div>
            <v-link class="link--sm catalog-product-card__link" :to="href">{{ name }}</v-link>
            <v-rating class="catalog-product-card__rating" :value="rating" readonly>
                <template v-slot:activeLabel>
                    <v-svg name="star-small" width="12" height="12" />
                </template>
                <template v-slot:inactiveLabel>
                    <v-svg name="star-empty-small" width="12" height="12" />
                </template>
            </v-rating>
        </div>
        <div class="catalog-product-card__tags">
            <tag class="catalog-product-card__tags-item" v-for="(tag, index) in tags" :key="index" :text="tag" />
        </div>
        <v-link class="catalog-product-card__wishlist-btn">
            <v-svg name="wishlist-middle" width="18" height="20" />
        </v-link>
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VButton from '../controls/VButton/VButton.vue';
import VRating from '../controls/VRating/VRating.vue';
import VPicture from '../controls/VPicture/VPicture.vue';
import Tag from '../Tag/Tag.vue';

import '../../assets/images/sprites/star-empty-small.svg';
import '../../assets/images/sprites/star-small.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/logo.svg';
import './CatalogProductCard.css';

import { generatePictureSourcePath } from '../../util/images';

export default {
    name: 'catalog-product-card',

    components: {
        VSvg,
        VLink,
        VButton,
        VRating,
        VPicture,

        Tag,
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
            type: String,
        },

        image: {
            type: [String, Object],
        },

        rating: {
            type: Number,
            default: 0,
        },

        price: {
            type: [String, Number],
            default: null,
        },

        oldPrice: {
            type: [String, Number],
            default: null,
        },

        isSmall: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        onBuyButtonClick() {
            this.$emit('addItem', { id: this.productId, type: this.type });
        },

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },
};
</script>

