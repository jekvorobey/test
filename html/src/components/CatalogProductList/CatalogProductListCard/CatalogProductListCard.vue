<template>
    <router-link
        tag="a"
        class="catalog-product-list-card"
        :class="{ 'catalog-product-list-card--small': isSmall }"
        :to="href"
        v-bind="itemPropSettings.itemListElement"
    >
        <meta v-bind="itemPropSettings.position" />
        <div v-bind="itemPropSettings.item">
            <link v-bind="itemPropSettings.url" />
            <div class="catalog-product-list-card__img">
                <v-picture :key="item.image.id" v-if="images">
                    <source :data-srcset="images.desktop.webp" type="image/webp" media="(min-width: 480px)" />
                    <source :data-srcset="images.desktop.orig" media="(min-width: 480px)" />
                    <source :data-srcset="images.mobile.webp" type="image/webp" media="(max-width: 479px)" />
                    <source :data-srcset="images.mobile.orig" media="(max-width: 479px)" />
                    <img
                        class="blur-up lazyload v-picture__img"
                        :data-src="images.default"
                        :src="itemProp ? images.default : null"
                        v-bind="itemPropSettings.image"
                        alt=""
                    />
                </v-picture>
                <v-svg v-else id="catalog-product-list-card-empty" name="logo" width="48" height="48" />

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
            </div>

            <div class="catalog-product-list-card__body" v-once>
                <div class="catalog-product-list-card__prices" v-bind="itemPropSettings.offers">
                    <price
                        class="text-bold catalog-product-list-card__price"
                        v-if="item.price"
                        v-bind="item.price"
                        :item-prop="itemProp"
                        has-articles
                    />
                    <price
                        class="text-sm text-grey text-strike catalog-product-list-card__price"
                        v-if="item.oldPrice"
                        v-bind="item.oldPrice"
                        has-articles
                    />
                </div>

                <div class="link--sm catalog-product-list-card__link" v-bind="itemPropSettings.name">
                    {{ item.name }}
                </div>

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
                    v-for="badge in item.badges"
                    :key="badge"
                    :text="badge"
                />
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
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Tag from '@components/Tag/Tag.vue';
import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';

import { mapGetters } from 'vuex';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import { generateAbsoluteProductUrl, generateProductUrl, prepareProductImage } from '@util/catalog';

import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/logo.svg';
import './CatalogProductListCard.css';

export default {
    name: 'catalog-product-list-card',

    components: {
        VSvg,
        VLink,
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

        showWishlistBtn: {
            type: Boolean,
            default: true,
        },

        isSmall: {
            type: Boolean,
            default: false,
        },

        position: {
            type: Number,
        },

        itemProp: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        inFavorites() {
            return this[IS_IN_FAVORITES](this.item.productId);
        },

        showBuyBtn() {
            const { stock: { qty = 0 } = { qty: 0 } } = this.item;
            return qty > 0;
        },

        images() {
            const { image } = this.item;
            return image && image.id && prepareProductImage(image, 380, null, 230);
        },

        href() {
            const { item, referralCode } = this;
            const { code, categoryCodes = [] } = item || {};

            return (
                categoryCodes &&
                categoryCodes.length > 0 &&
                generateProductUrl(categoryCodes[categoryCodes.length - 1], code, referralCode)
            );
        },

        absoluteHref() {
            const { item } = this;
            const { code, categoryCodes = [] } = item || {};

            return (
                categoryCodes &&
                categoryCodes.length > 0 &&
                generateAbsoluteProductUrl(categoryCodes[categoryCodes.length - 1], code)
            );
        },

        itemPropSettings() {
            const { itemProp, item, position, absoluteHref } = this;
            const { price } = item || {};

            return itemProp && item
                ? {
                      itemListElement: {
                          itemprop: 'itemListElement',
                          itemscope: true,
                          itemtype: 'https://schema.org/ListItem',
                      },
                      item: {
                          itemprop: 'item',
                          itemscope: true,
                          itemtype: 'https://schema.org/Product',
                      },
                      name: {
                          itemprop: 'name',
                      },
                      url: {
                          itemprop: 'url',
                          href: absoluteHref,
                      },
                      image: {
                          itemprop: 'image',
                      },
                      position: {
                          itemprop: 'position',
                          content: position,
                      },
                      offers: {
                          itemprop: 'offers',
                          itemscope: true,
                          itemtype:
                              price.value instanceof Object
                                  ? 'https://schema.org/AggregateOffer'
                                  : 'https://schema.org/Offer',
                      },
                  }
                : {
                      itemListElement: {},
                      name: {},
                      image: {},
                      offers: {},
                  };
        },

        isTabletLg() {
            return this.$mq.tabletLg;
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
