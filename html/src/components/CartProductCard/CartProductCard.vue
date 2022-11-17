<template>
    <div
        class="cart-product-card"
        :class="[{ 'cart-product-card--small': isSmall }, { 'cart-product-card--inactive': !isActive }]"
    >
        <router-link class="cart-product-card__img" :to="href">
            <v-picture v-if="image && image.id">
                <slot>
                    <source :data-srcset="images.desktop.webp" type="image/webp" media="(min-width: 480px)" />
                    <source :data-srcset="images.desktop.orig" media="(min-width: 480px)" />
                    <source :data-srcset="images.mobile.webp" type="image/webp" media="(max-width: 479px)" />
                    <source :data-srcset="images.mobile.orig" media="(max-width: 479px)" />
                    <img class="blur-up lazyload v-picture__img" :data-src="images.desktop" alt="" />
                </slot>
            </v-picture>
            <v-svg v-else id="cart-product-card-empty" name="logo" width="48" height="48" />
        </router-link>
        <div class="cart-product-card__body">
            <v-link class="cart-product-card__body-name" :to="href">{{ name }}</v-link>
            <div class="cart-product-card__body-count" v-if="showCount && userCanBuy">
                <v-counter min="1" :max="maxCount" :value="count" @input="debounce_countChange" :disabled="!isActive" />
            </div>

            <div
                :class="{
                    'cart-product-card__body-prices': true,
                    'cart-product-card__body-prices--no-price': noPrice && !isMobile && !isTablet,
                }"
            >
                <price tag="div" class="text-bold cart-product-card__body-price" v-bind="price" />
                <price
                    tag="div"
                    class="text-grey text-strike cart-product-card__body-price cart-product-card__body-price--old"
                    v-if="oldPrice"
                    v-bind="oldPrice"
                />
            </div>
            <div class="cart-product-card__body-info">
                <div class="text-grey text-sm" v-if="isActive">
                    <!-- неизвестно, будет ли это -->
                    <!-- Ближайшая доставка 24 июня<br />
                    Ближайший самовывоз c 26 июня -->
                </div>
                <div class="status-color-error text-sm" v-else>Товар закончился</div>
            </div>
            <div
                class="text-grey cart-product-card__body-bonus"
                :class="{ 'cart-product-card__body-bonus--hidden': referralPartner || bonus === 0 }"
            >
                + {{ bonus }} {{ bonusLabel }}
            </div>
            <div class="cart-product-card__body-controls" v-if="showControls">
                <favorites-button
                    class="cart-product-card__body-controls-link"
                    :is-active="inFavorites"
                    is-small
                    @click="onToggleFavorite"
                >
                    &nbsp;{{ favoritesBtnText }}
                </favorites-button>

                <v-link class="cart-product-card__body-controls-link" tag="button" @click="onDeleteClick">
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

import { mapGetters, mapState } from 'vuex';
import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import _debounce from 'lodash/debounce';
import { fileExtension } from '@enums';
import { pluralize } from '@util';
import { generatePictureSourcePath } from '@util/file';
import '@images/sprites/cross-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import './CartProductCard.css';

export default {
    name: 'cart-product-card',

    components: {
        VSvg,
        VLink,
        VPicture,
        VCounter,

        Price,
        FavoritesButton,
    },

    props: {
        offerId: {
            type: [String, Number],
            required: true,
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
            default: '/',
        },

        image: {
            type: [String, Object],
        },

        price: {
            type: [Object, String],
        },

        oldPrice: {
            type: [Object, String],
        },

        bonus: {
            type: Number,
            default: 0,
        },

        count: {
            type: Number,
            default: 1,
        },

        maxCount: {
            type: Number,
            default: 1,
        },

        showCount: {
            type: Boolean,
            default: false,
        },

        showControls: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isSmall: {
            type: Boolean,
            default: false,
        },

        userCanBuy: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),

        images() {
            const { image } = this;
            if (image && image.id)
                return {
                    desktop: {
                        webp: generatePictureSourcePath(300, 300, image.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(300, 300, image.id),
                    },
                    mobile: {
                        webp: generatePictureSourcePath(72, 72, image.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(72, 72, image.id),
                    },
                    default: generatePictureSourcePath(300, 300, image.id),
                };
        },

        favoritesBtnText() {
            if (this.isTablet) return '';
            if (this.inFavorites) return 'В избранном';
            return 'Добавить в избранное';
        },

        deleteBtnText() {
            if (this.isTablet) return '';
            return 'Удалить';
        },

        bonusLabel() {
            const { bonus } = this;
            return pluralize(bonus, ['бонус', 'бонуса', 'бонусов']);
        },

        inFavorites() {
            return this[IS_IN_FAVORITES](this.productId);
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isMobile() {
            return this.$mq.mobile;
        },

        noPrice() {
            if (this.price && typeof this.price.isPriceHidden !== 'undefined' && this.price.isPriceHidden === true) {
                return true;
            }

            return false;
        },
    },

    methods: {
        onToggleFavorite(value) {
            this.$emit('toggle-favorite-item', { productId: this.productId });
        },

        onCountChange(value) {
            if (value > 0) this.$emit('countChange', { id: this.offerId, type: this.type, count: value });
            else this.$emit('deleteItem', { id: this.offerId, type: this.type });
        },

        onDeleteClick() {
            this.$emit('deleteItem', { id: this.offerId, type: this.type });
        },
    },

    created() {
        this.debounce_countChange = _debounce(this.onCountChange, 500);
    },
};
</script>
