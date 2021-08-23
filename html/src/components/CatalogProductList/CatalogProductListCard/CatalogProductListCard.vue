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
                        v-if="item.price || item.isPriceHidden"
                        v-bind="
                            item.oldPrice && isEqPrices(modifiedPrice, modifiedOldPrice)
                                ? concretePrice(modifiedPrice)
                                : modifiedPrice
                        "
                        :item-prop="itemProp"
                        has-articles
                    />
                    <price
                        class="text-sm text-grey text-strike catalog-product-list-card__price"
                        v-if="item.oldPrice && !isEqPrices(modifiedPrice, modifiedOldPrice)"
                        v-bind="concretePrice(modifiedOldPrice)"
                        has-articles
                    />
                </div>

                <div class="link--sm catalog-product-list-card__link" v-bind="itemPropSettings.name">
                    {{ item.name }}
                </div>

                <ul class="catalog-product-list-card__variant">
                    <li v-for="variant in variantGroupsValue" class="catalog-product-list-card__variant--item">
                        {{ variant }}
                    </li>
                </ul>

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
                    v-for="badge in badgesUnique(item.badges)"
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

        variantGroupsValue() {
            if (!this.item.variantGroups) return;
            const declensionVariants = {
                Оттенок: ['оттенок', 'оттенка', 'оттенков'],
                Цвет: ['цвет', 'цвета', 'цветов'],
                Тон: ['тон', 'тона', 'тонов'],
            };
            const result = this.item.variantGroups.characteristics.reduce((accumulator, current) => {
                const colorString = Object.keys(declensionVariants).reduce((acc, cur) => {
                    return current.name.toLocaleLowerCase().includes(cur.toLocaleLowerCase()) ? current.name : acc;
                }, '');
                if (typeof current.values[0] === 'number') {
                    const currentValuesSorted = current.values.sort((a, b) => a - b);
                    if (currentValuesSorted.length <= 3) {
                        accumulator.push(
                            currentValuesSorted.join('/') +
                                (current.measurement_unit ? ' ' + current.measurement_unit : '')
                        );
                    } else {
                        accumulator.push(
                            Math.min.apply(null, currentValuesSorted) + '–' + Math.max.apply(null, currentValuesSorted)
                        );
                    }
                } else if (declensionVariants[colorString]) {
                    accumulator.push(
                        current.values.length +
                            ' ' +
                            this.declension(current.values.length, declensionVariants[colorString])
                    );
                } else {
                    accumulator.push(current.values.join(' / '));
                }
                return accumulator;
            }, []);
            return result;
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
    },
};
</script>
