<template>
    <router-link
        tag="a"
        class="catalog-product-card"
        :class="{ 'catalog-product-card--small': isSmall }"
        :to="href"
        @click.native.capture="onClick($event)"
    >
        <div class="catalog-product-card__img"
             :class="{'catalog-product-list-card__img-gray': this.isBuyButtonClicked && !inCart}"
        >
            <v-picture :key="image.id" v-if="images">
                <source :data-srcset="images.desktop.webp" type="image/webp" media="(min-width: 480px)" />
                <source :data-srcset="images.desktop.orig" media="(min-width: 480px)" />
                <source :data-srcset="images.mobile.webp" type="image/webp" media="(max-width: 479px)" />
                <source :data-srcset="images.mobile.orig" media="(max-width: 479px)" />
                <img
                    class="blur-up lazyload v-picture__img"
                    :src="images.default"
                    :srcset="images.placeholder"
                    alt=""
                    loading="lazy"
                />
            </v-picture>

            <no-photo-stub v-else />

            <div class="catalog-product-card__controls" v-if="showControls && !isTabletLg">
                <buy-button
                    v-if="showBuyBtn && !limitQtyToBuy"
                    class="btn--outline catalog-product-card__controls-btn"
                    @click.prevent="onBuyButtonClick"
                >
                    Купить
                </buy-button>

                <v-link tag="button" class="catalog-product-card__controls-link" @click.prevent="onPreview">
                    Быстрый&nbsp;просмотр
                </v-link>
            </div>
            <div
                v-if="$mq.tablet && !limitQtyToBuy"
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

        <div class="catalog-product-card__body">
            <div class="catalog-product-card__prices">
                <price class="text-bold catalog-product-card__price" v-bind="modifiedPrice" has-articles />
                <price
                    class="text-sm text-grey catalog-product-card__price"
                    v-if="oldPrice"
                    v-bind="modifiedOldPrice"
                    has-articles
                />
            </div>

            <div class="link--sm catalog-product-card__link">
                {{ name }}
            </div>

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
            <tag class="catalog-product-card__tags-item" v-for="badge in badgesUnique" :key="badge" :text="badge" />
        </div>

        <favorites-button
            class="catalog-product-card__wishlist-btn"
            :class="{ 'catalog-product-card__wishlist-btn--active': inFavorites }"
            v-if="showWishlistBtn"
            :isActive="inFavorites"
            @click.prevent="onFavoritesBtnClick"
        />
    </router-link>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VRating from '@controls/VRating/VRating.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import Tag from '@components/Tag/Tag.vue';
import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';
import NoPhotoStub from '@components/NoPhotoStub/NoPhotoStub.vue';

import { mapGetters } from 'vuex';
import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import { prepareProductImage } from '@util/catalog';
import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import './CatalogProductCard.css';
import '../CatalogProductList/CatalogProductListCard/CatalogProductListCard.css';
import '@images/sprites/cart.svg';
import '@images/sprites/cart-filled.svg';

export default {
    name: 'catalog-product-card',

    components: {
        NoPhotoStub,
        VSvg,
        VLink,
        VRating,
        VPicture,
        VSpinner,

        Tag,
        Price,
        BuyButton,
        FavoritesButton,
    },
    data(){
        return{
            isBuyButtonClicked: false,
        }
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

        badges: {
            type: Array,
            default() {
                return [];
            },
        },

        href: {
            type: [Object, String],
            default: '/',
        },

        image: {
            type: Object,
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

        isPriceHidden: {
            type: Boolean,
        },

        isSmall: {
            type: Boolean,
            default: false,
        },

        showControls: {
            type: Boolean,
            default: true,
        },

        showBuyBtn: {
            type: Boolean,
            default: false,
        },

        showWishlistBtn: {
            type: Boolean,
            default: true,
        },

        inCart: {
            type: Boolean,
            default: false,
        },

        limit: {
            type: [Number, Boolean],
            default: false,
            reuired: false
        }
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        images() {
            const { image } = this;
            return image && image.id && prepareProductImage(image, 380, null, 230);
        },

        inFavorites() {
            return this[IS_IN_FAVORITES](this.productId);
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        badgesUnique() {
            return this.badges ? this.badges.filter((v, i, a) => a.indexOf(v) === i) : [];
        },

        limitQtyToBuy() {
            return this.limit && this.limit > 0;
        },

        modifiedPrice() {
            return this.price
                ? Object.assign(this.price, { isPriceHidden: this.isPriceHidden })
                : { isPriceHidden: this.isPriceHidden };
        },

        modifiedOldPrice() {
            return this.oldPrice ?? Object.assign(this.oldPrice, { isPriceHidden: this.isPriceHidden });
        },
    },

    methods: {
        onBuyButtonClick() {
            this.isBuyButtonClicked = true;
            this.$emit('add-item', { id: this.offerId, type: this.type });
        },

        onFavoritesBtnClick() {
            this.$emit('toggle-favorite-item', { id: this.productId });
        },

        onPreview() {
            this.$emit('preview', { id: this.productId, type: this.type });
        },

        onClick(event) {
            if (event.target.nodeName !== 'BUTTON') this.$emit('click-event-triggered');
        },
    },
};
</script>
