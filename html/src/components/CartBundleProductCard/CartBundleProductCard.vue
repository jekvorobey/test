<template>
    <div class="cart-bundle-product-card">
        <div class="cart-bundle-product-card__images" :class="`length-is-${items.length}`">
            <div class="cart-bundle-product-card__image" v-for="({ image }, index) in items" :key="index">
                <v-picture v-if="image && image.id" :image="image" alt="">
                    <template v-slot:source="{ image }">
                        <source
                            :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                            type="image/webp"
                            media="(min-width: 480px)"
                        />
                        <source
                            :data-srcset="generateSourcePath(72, 72, image.id, 'webp')"
                            type="image/webp"
                            media="(max-width: 479px)"
                        />
                    </template>
                    <template v-slot:fallback="{ image, lazy, alt }">
                        <img
                            class="blur-up lazyload v-picture__img"
                            :data-src="generateSourcePath(300, 300, image.id)"
                            :alt="alt"
                        />
                    </template>
                </v-picture>
                <v-svg v-else id="cart-bundle-product-card-empty" name="logo" width="48" height="48" />
            </div>
        </div>

        <div class="cart-bundle-product-card__body">
            <div class="cart-bundle-product-card__body-bundle-info">
                <v-link class="cart-bundle-product-card__body-name">{{ name }}</v-link>
                <ol class="cart-bundle-product-card__list">
                    <li class="cart-bundle-product-card__list-item" v-for="item in items" :key="item.id">
                        {{ item.name }};
                    </li>
                </ol>
            </div>
            <div class="cart-bundle-product-card__body-count">
                <v-counter :value="count" :min="1" :max="maxBundlesCount"  @input="debounce_countChange" />
            </div>
            <div class="cart-bundle-product-card__body-price">
                <price tag="div" class="text-bold cart-bundle-product-card__price" v-bind="price" />
                <price
                    tag="div"
                    class="text-grey text-strike cart-bundle-product-card__old-price cart-bundle-product-card__body-price--old"
                    v-if="oldPrice"
                    v-bind="oldPrice"
                />
            </div>
            <div class="cart-bundle-product-card__body-controls">
                <favorites-button
                    class="cart-bundle-product-card__body-controls-link"
                    :is-active="inFavorites"
                    is-small
                    @click="onToggleFavorite"
                >
                    &nbsp;{{ favoritesBtnText }}
                </favorites-button>

                <v-link class="cart-bundle-product-card__body-controls-link" tag="button" @click="onDeleteClick">
                    <v-svg name="cross-small" width="10" height="10" />
                    &nbsp;{{ deleteBtnText }}
                </v-link>
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VCounter from '@controls/VCounter/VCounter.vue';

import Price from '@components/Price/Price.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';

import { mapGetters, mapActions, mapState } from 'vuex';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import _debounce from 'lodash/debounce';
import { generatePictureSourcePath } from '@util/file';

import '@images/sprites/cross-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import './CartBundleProductCard.css';

export default {
    name: 'cart-bundle-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VCounter,

        Price,
        FavoritesButton,
    },

    props: {
        bundleId: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            default: 'Выгодный комплект',
            required: true,
        },

        price: {
            type: [Object, String],
        },

        oldPrice: {
            type: [Object, String],
        },

        items: {
            type: Array,
            required: true,
        },

        count: {
            type: Number,
            default: 1,
            required: true,
        },

        bonus: {
            type: Number,
            default: null,
        },
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        favoritesBtnText() {
            if (this.isTablet) return '';
            if (this.inFavorites) return 'В избранном';
            return 'Перенести в избранное';
        },

        inFavorites() {
            return this[IS_IN_FAVORITES](this.bundleId);
        },

        deleteBtnText() {
            if (this.isTablet) return '';
            return 'Удалить';
        },

        maxBundlesCount() {
            return Math.min(...this.items.map(item => item.stock.qty));
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        onToggleFavorite(value) {
           return false;
        },

        onDeleteClick() {
            this.$emit('deleteBundle', this.bundleId);
        },

        onCountChange(value) {
            if (value > 0) this.$emit('countChange', { id: this.id, count: this.count });
        },

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },
    },

    created() {
        this.debounce_countChange = _debounce(this.onCountChange, 200);
    },
};
</script>