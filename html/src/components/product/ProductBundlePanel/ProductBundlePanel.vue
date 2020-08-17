<template>
    <div class="product-bundle-panel">
        <h2 class="product-bundle-panel__title">
            Выгодный комплект
        </h2>
        <div class="product-bundle-panel__content">
            <template v-for="item in products">
                <catalog-product-card
                    v-if="!isTabletLg && products.length <= 4"
                    class="product-bundle-panel__item"
                    :key="item.id"
                    :product-id="item.productId"
                    :type="item.type"
                    :name="item.name"
                    :href="item.url"
                    :image="item.image"
                    :price="item.price"
                    :old-price="item.oldPrice"
                    :badges="item.badges"
                    :rating="item.rating"
                    :offer-id="item.productId"
                    :show-controls="false"
                />
                <package-product-card
                    v-else
                    class="product-bundle-panel__item product-bundle-panel__item--panel"
                    :key="item.id"
                    :name="item.name"
                    :image="item.image"
                    :href="item.url"
                    :price="item.price"
                    :old-price="item.price"
                    :count="item.qty"
                    :show-count="false"
                >
                    <source :data-srcset="item.desktopImg.webp" type="image/webp" />
                    <source :data-srcset="item.desktopImg.orig" />
                    <img class="blur-up lazyload v-picture__img" :data-src="item.defaultImg" />
                </package-product-card>
            </template>

            <div class="product-bundle-panel__total">
                <div class="product-bundle-panel__total-info">
                    <price class="text-bold product-bundle-panel__total-info-price" v-if="price" v-bind="price" />

                    <price
                        class="text-sm text-grey text-strike product-bundle-panel__total-info-price"
                        v-if="oldPrice && isTablet"
                        v-bind="oldPrice"
                    />

                    <div class="product-bundle-panel__total-info-sale">
                        <price
                            class="text-sm text-grey text-strike product-bundle-panel__total-info-sale-price"
                            v-if="oldPrice && !isTablet"
                            v-bind="oldPrice"
                        />

                        <span class="text-grey product-bundle-panel__total-info-sale-span">
                            Вы сэкономите&nbsp;<price
                                class="product-bundle-panel__total-info-sale-span-price"
                                v-if="diffPrice"
                                v-bind="diffPrice"
                        /></span>
                    </div>
                </div>

                <div class="product-bundle-panel__total-controls">
                    <buy-button class="product-bundle-panel__btn" @click.prevent="onAddBundle">
                        Добавить в корзину
                    </buy-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import PackageProductCard from '@components/PackageProductCard/PackageProductCard.vue';

import { generateProductUrl } from '@util/catalog';
import { generatePictureSourcePath } from '@util/file';
import { fileExtension } from '@enums';
import './ProductBundlePanel.css';

export default {
    name: 'product-bundle-panel',
    components: {
        VButton,
        Price,
        BuyButton,

        CatalogProductCard,
        PackageProductCard,
    },

    props: {
        title: {
            type: String,
            default: 'Title',
        },

        items: {
            type: Array,
            default: () => [],
        },

        price: {
            type: [Object, String],
            required: true,
        },

        oldPrice: {
            type: [Object, String],
            default: () => {},
        },

        bundleId: {
            type: Number,
            required: true,
        },
    },

    computed: {
        diffPrice() {
            return {
                value: this.oldPrice.value - this.price.value,
                currency: this.price.currency,
            };
        },

        products() {
            const { items = [] } = this;
            return items.map(i => {
                const { image } = i;

                const defaultImg = image && generatePictureSourcePath(128, 128, image.id);
                const desktopImg = image && {
                    webp: generatePictureSourcePath(128, 128, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(128, 128, image.id),
                };

                return {
                    ...i,
                    desktopImg,
                    defaultImg,
                    url: generateProductUrl(i.categoryCodes[i.categoryCodes.length - 1], i.code),
                };
            });
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        onAddBundle() {
            this.$emit('add-bundle', {
                bundleId: this.bundleId,
                count: 1,
            });
        },
    },
};
</script>
