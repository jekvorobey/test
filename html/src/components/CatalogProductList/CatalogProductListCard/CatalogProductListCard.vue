<template>
    <router-link
        tag="a"
        class="catalog-product-list-card"
        :class="[{ 'catalog-product-list-card--small': isSmall }]"
        :style="componentStyle"
        :to="href"
        v-bind="itemPropSettings.itemListElement"
        @click.native.capture="onClick($event)"
    >
        <meta v-bind="itemPropSettings.position" />
        <div v-bind="itemPropSettings.item">
            <link v-bind="itemPropSettings.url" />

            <div class="catalog-product-list-card__img"
                 :class="{'catalog-product-list-card__img-gray': this.isBuyButtonClicked && !inCart}">
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

                <no-photo-stub v-else />

                <div v-if="!isTabletLg" class="catalog-product-list-card__controls" v-once>
                    <buy-button
                        v-if="showBuyBtn && !limitQtyToBuy"
                        class="btn--outline catalog-product-list-card__controls-btn"
                        @click.prevent="onBuyButtonClick"
                    >
                        Купить
                    </buy-button>
                    <v-link tag="button" class="catalog-product-list-card__controls-link" @click.prevent="onPreview">
                        Быстрый&nbsp;просмотр
                    </v-link>
                </div>

                <ul class="catalog-product-list-card__variants">
                    <li
                        v-for="(variant, i) in variantGroupsValue"
                        :key="i"
                        :class="{
                            'catalog-product-list-card__variant': true,
                            'catalog-product-list-card__variant--has-more': variant.length > maxVisibleVariantValues,
                        }"
                    >
                        {{ variant.slice(0, maxVisibleVariantValues).join(' / ') }}
                    </li>
                </ul>

                <ul class="catalog-product-list-card__variants catalog-product-list-card__variants-right-top" v-if="isOfferVariants && !isTablet">
                    <li class="catalog-product-list-card__variant">
                       Выгодно
                    </li>
                </ul>

                <v-link
                        v-if="$mq.tablet && referralPartner && showReferralPromo"
                        @click.prevent.stop="onTogglePromoItem"
                        tag="button"
                        class="catalog-product-list-card__mobile-cart-btn"
                        style="right: 40px; bottom: 0;"
                >
                    <app-icon v-if="!inPromo" name="PromoBasketIcon" width="24" height="24"/>
                    <app-icon v-else name="PromoBasketFilledIcon" width="24" height="24"/>
                </v-link>

                <div
                    v-if="$mq.tablet && !limitQtyToBuy"
                    class="catalog-product-list-card__mobile-cart-btn"
                    @click.prevent.stop="onBuyButtonClick"
                >
                    <v-spinner width="24" height="24" :show="this.isBuyButtonClicked && !inCart"/>
                    <v-link tag="button" :disabled="this.isAddingToBasket">
                        <transition name="fade-absolute">
                            <v-svg v-if="inCart" name="cart-filled" key="cart-filled" width="22" height="22" />
                            <v-svg v-else name="cart" key="cart" width="22" height="22" />
                        </transition>
                    </v-link>
                </div>
            </div>

            <div class="catalog-product-list-card__body">
                <div class="catalog-product-list-card__prices" v-bind="itemPropSettings.offers">
                    <price
                        class="text-bold catalog-product-list-card__price"
                        v-if="item.price || !item.price || item.isPriceHidden"
                        v-bind="
                            item.oldPrice && isEqPrices(modifiedPrice, modifiedOldPrice)
                                ? concretePrice(modifiedPrice)
                                : modifiedPrice
                        "
                        :item-prop="itemProp"
                        has-articles
                    >
                        <v-svg v-if="isOfferVariantsWithOutPrice"
                               class="catalog-product-list-card__prices-discount-svg"
                               name="offer-union"
                               key="offer-union"
                               width="20"
                               height="20"
                        />
                    </price>
                    <price
                        class="text-sm text-grey catalog-product-list-card__price"
                        v-if="item.oldPrice && !isEqPrices(modifiedPrice, modifiedOldPrice)"
                        v-bind="concretePrice(modifiedOldPrice)"
                        has-articles
                    ></price>
                    <installment-price
                            v-if="item.installment && item.installment.isInstallmentAvailable"
                            :value="item.price.value"
                            :installment-period="item.installment.installmentPeriod"
                    />
                </div>

                <div class="link--sm catalog-product-list-card__link" v-bind="itemPropSettings.name">
                    {{ item.name }}
                </div>

                <div class="catalog-product-list-card__rating">
                    <span
                        v-for="number in 5"
                        class="catalog-product-list-card__rating-star"
                        :class="{ 'catalog-product-list-card__rating-star--empty': number > item.rating }"
                        :key="number"
                    />
                    <v-link
                            v-if="!$mq.tablet && referralPartner && showReferralPromo"
                            @click.prevent.stop="onTogglePromoItem"
                            tag="button"
                            class="catalog-product-list-card__controls-link-promo"
                    >
                        <app-icon v-if="!inPromo" name="PromoBasketIcon" width="24" height="24"/>
                        <app-icon v-else name="PromoBasketFilledIcon" width="24" height="24"/>
                    </v-link>
                </div>
            </div>

            <div class="catalog-product-list-card__tags" v-once>
                <tag
                    class="catalog-product-list-card__tags-item"
                    v-for="badge in badgesUnique(item.badges)"
                    :key="badge"
                    :text="badge"
                />
            </div>

            <favorites-button
                class="catalog-product-list-card__wishlist-btn"
                :class="{ 'catalog-product-list-card__wishlist-btn--active': inFavorites,
                'catalog-product-list-card__wishlist-btn--active-desktop': inFavorites && isOfferVariants && !isTablet }"
                @click="onToggleFavorite"
                :is-active="inFavorites"
            />
        </div>
    </router-link>
</template>

<script>
import VSpinner from '@controls/VSpinner/VSpinner.vue';
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Tag from '@components/Tag/Tag.vue';
import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';
import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';
import NoPhotoStub from '@components/NoPhotoStub/NoPhotoStub.vue';
import InstallmentPrice from "@components/InstallmentPrice/InstallmentPrice.vue";
import AppIcon from "@components/icons/AppIcon.vue";

import {mapGetters, mapState} from 'vuex';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';
import { NAME as CATALOG_MODULE } from '@store/modules/Catalog';
import { IS_IN_PROMO} from "@store/modules/Catalog/getters";
import {IS_ADDING_TO_BASKET, NAME as CART_MODULE} from "@store/modules/Cart";
import { generateAbsoluteProductUrl, generateProductUrl, prepareProductImage } from '@util/catalog';

import {NAME as AUTH_MODULE, USER, REFERRAL_PARTNER} from '@store/modules/Auth';

import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/cart.svg';
import '@images/sprites/cart-filled.svg';
import '@images/sprites/offer-union.svg';

import './CatalogProductListCard.css';

export default {
    name: 'catalog-product-list-card',

    components: {
        NoPhotoStub,
        VSvg,
        VLink,
        VPicture,
        InstallmentPrice,
        Tag,
        Price,
        BuyButton,
        FavoritesButton,
        VSpinner,
        AppIcon
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

        mobileOrder: {
            type: Number,
        },

        inCart: {
            type: Boolean,
            default: false,
        },

        showReferralPromo: {
            type: Boolean,
            default: true,
            required: false,
        }
    },

    computed: {
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false
        }),

        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),
        ...mapGetters(CATALOG_MODULE, [IS_IN_PROMO]),

        ...mapState(CART_MODULE, {
            isAddingToBasket: (state) => state[IS_ADDING_TO_BASKET]
        }),

        inFavorites() {
            return this[IS_IN_FAVORITES](this.item.productId);
        },

        inPromo() {
            return this[IS_IN_PROMO](this.item.productId);
        },

        showBuyBtn() {
            const { stock: { qty = 0 } = { qty: 0 } } = this.item;
            return qty > 0;
        },

        limitQtyToBuy() {
            return this.item.limitQty && this.item.limitQty > 0;
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
                              price && price.value instanceof Object
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

        isTablet() {
            return this.$mq.tablet;
        },

        isOfferVariants() {
            try {
                const res = this.item.offerVariants.filter(offer => offer.options && offer.options.length > 0)
                return res.length > 0
            } catch (e) {
                return false
            }
        },

        isOfferVariantsWithOutPrice() {
            try {
                const res = this.item.offerVariants.filter(
                    offer => offer.options &&
                    offer.options.length > 0 &&
                    offer.price &&
                    offer.price.value &&
                    +offer.price.value > 0
                )
                return res.length > 0
            } catch (e) {
                return false
            }
        },

        maxVisibleVariantValues() {
            if (this.isTabletLg) {
                return 2;
            }

            return 3;
        },

        variantGroupsValue() {
            if (!this.item.variantGroups) return;

            const declensionVariants = {
                'Оттенок': ['оттенок', 'оттенка', 'оттенков'], // eslint-disable-line
                'Цвет': ['цвет', 'цвета', 'цветов'], // eslint-disable-line
                'Тон': ['тон', 'тона', 'тонов'], // eslint-disable-line
                'Размер': ['размер', 'размера', 'размеров'], // eslint-disable-line
            };

            const result = this.item.variantGroups.characteristics.reduce((accumulator, current) => {
                const colorString = Object.keys(declensionVariants).reduce((acc, cur) => {
                    return current.name.toLocaleLowerCase().includes(cur.toLocaleLowerCase()) ? current.name : acc;
                }, '');

                let values;

                if (typeof current.values[0] === 'number') {
                    const currentValuesSorted = current.values.sort((a, b) => a - b);
                    if (currentValuesSorted.length <= 3) {
                        values =
                            currentValuesSorted.join('/') +
                            (current.measurement_unit ? ' ' + current.measurement_unit : '');
                    } else {
                        values =
                            Math.min.apply(null, currentValuesSorted) + '–' + Math.max.apply(null, currentValuesSorted);
                    }
                } else if (declensionVariants[colorString]) {
                    if (current.values.length > this.maxVisibleVariantValues) {
                        values =
                            current.values.length +
                            ' ' +
                            this.declension(current.values.length, declensionVariants[colorString]);
                    } else {
                        values = [...current.values].filter((item) => item.length > 0);
                    }
                } else {
                    values = [...current.values].filter((item) => item.length > 0);
                }

                if (!Array.isArray(values)) {
                    values = [values];
                }

                accumulator.push(values);

                return accumulator;
            }, []);

            return result.slice(0, 2).filter((item) => item.length > 0);
        },

        modifiedPrice() {
            return this.item.price
                ? Object.assign(this.item.price, { isPriceHidden: this.item.isPriceHidden })
                : { isPriceHidden: this.item.isPriceHidden };
        },

        modifiedOldPrice() {
            return this.item.oldPrice
                ? Object.assign(this.item.oldPrice, { isPriceHidden: this.item.isPriceHidden })
                : { isPriceHidden: this.item.isPriceHidden };
        },

        componentStyle() {
            let style = {};

            if (this.$mq.mobile) {
                style['order'] = this.mobileOrder;
            }

            return style;
        },
    },

    methods: {
        async onTogglePromoItem() {
            this.$emit('toggle-promo-item');
        },

        onBuyButtonClick() {
            // костыль инвалида по требованию, убрать после доработки
            if (!this.isAddingToBasket) {
                this.isBuyButtonClicked = true;

                this.$emit('add-item', {
                    id: this.item.id,
                    storeId: this.item.stock.storeId,
                    type: this.item.type,
                });
            }
            setTimeout(() => {
                this.isBuyButtonClicked = false;
            }, 4000);
        },

        onToggleFavorite() {
            this.$emit('toggle-favorite-item', { productId: this.item.productId });
        },

        onPreview() {
            this.$emit('preview', { id: this.item.id, type: this.item.type });
        },

        declension(number, txt, cases = [2, 0, 1, 1, 1, 2]) {
            return txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
        },

        isEqPrices(price, oldPrice) {
            if (
                price.value &&
                typeof price.value === 'object' &&
                price.value.to !== null &&
                price.value.from !== null
            ) {
                return false;
            }
            if (
                oldPrice.value &&
                typeof oldPrice.value === 'object' &&
                oldPrice.value.to !== null &&
                oldPrice.value.from !== null
            ) {
                return false;
            }

            let p1,
                p2 = null;

            if (price.value) {
                p1 = typeof price.value === 'number' ? price.value : price.value.from || price.value.to;
            }

            if (oldPrice.value) {
                p2 = typeof oldPrice.value === 'number' ? oldPrice.value : oldPrice.value.from || oldPrice.value.to;
            }

            return p1 === p2;
        },

        concretePrice(price) {
            if (
                price.value &&
                typeof price.value === 'object' &&
                price.value.from !== null &&
                price.value.to !== null
            ) {
                return price;
            }
            return {
                value:
                    typeof price.value === 'number'
                        ? price.value
                        : price.value
                        ? price.value.from || price.value.to
                        : null,
                isPriceHidden: price.isPriceHidden,
            };
        },

        badgesUnique(badges) {
            return badges ? badges.filter((v, i, a) => a.indexOf(v) === i) : [];
        },

        onClick(event) {
            if (event.target.nodeName !== 'BUTTON') this.$emit('click-event-triggered');
        },
    },
};
</script>
