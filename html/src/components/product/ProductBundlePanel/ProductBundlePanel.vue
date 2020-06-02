<template>
    <div class="product-bundle-panel">
        <h2 class="product-bundle-panel__title">
            Выгодный комплект
        </h2>
        <div class="product-bundle-panel__content">
            <ul class="product-bundle-panel__list" v-if="!tabletLg && items.length <= 4">
                <li class="product-bundle-panel__list-item" v-for="item in items" :key="item.id">
                    <catalog-product-card
                        class="product-bundle-panel__item"
                        :product-id="item.productId"
                        :type="item.type"
                        :name="item.name"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        :offer-id="item.productId"
                    />
                </li>
            </ul>
            <ul class="product-bundle-panel__panel-list" v-else>
                <package-product-card
                    v-for="item in items"
                    class="product-bundle-panel__panel-list-item"
                    :key="item.id"
                    :name="item.name"
                    :image="item.image"
                    :price="item.price"
                    :old-price="item.oldPrice"
                    :count="item.qty"
                />
            </ul>
            <div class="product-bundle-panel__total">
                <div class="product-bundle-panel__total-info">
                    <price class="text-bold product-bundle-panel__price product-bundle-panel__price--current" v-if="price" v-bind="price" />
                    <div class="product-bundle-panel__price-sale">
                        <price
                            class="text-sm text-grey text-strike product-bundle-panel__price product-bundle-panel__price--old"
                            v-if="oldPrice"
                            v-bind="oldPrice"
                        />
                        <span class="product-bundle-panel__price-span">
                            Вы сэкономите
                            <price
                                class="text-grey product-bundle-panel__price product-bundle-panel__price--diff"
                                v-if="diffPrice"
                                v-bind="diffPrice"
                            />
                        </span>
                    </div>
                </div>
                <div class="product-bundle-panel__total-controls">
                    <buy-button
                        class="product-bundle-panel__btn"
                        @click.prevent="onAddBundle"
                    >
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

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue'
import PackageProductCard from '@components/PackageProductCard/PackageProductCard.vue'

import './ProductBundlePanel.css'

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
        tabletLg() {
            return this.$mq.tabletLg;
        },

        diffPrice () {
            return {
                value: this.oldPrice.value - this.price.value,
                currency: this.price.currency,
            }
        },
    },

    methods: {
        onAddBundle() {
            this.$emit('add-bundle', {
                bundleId: this.bundleId,
                count: 1,
            });
        },
    }
}
</script>
