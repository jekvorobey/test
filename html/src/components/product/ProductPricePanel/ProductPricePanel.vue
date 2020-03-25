<template>
    <div class="product-price-panel">
        <div class="container product-price-panel__container">
            <div class="product-price-panel__img" v-if="image">
                <v-picture :key="image && image.id" v-if="image" alt="">
                    <source :data-srcset="smallImage" type="image/webp" />
                    <img class="blur-up lazyload v-picture__img" :data-src="defaultImage" alt="" />
                </v-picture>
            </div>

            <div class="text-medium product-price-panel__name">{{ name }}</div>

            <div>
                <price class="text-bold product-price-panel__price" :value="price.value" :currency="price.currency" />
                <price
                    v-if="oldPrice"
                    class="text-grey text-sm text-strike product-price-panel__price"
                    :value="oldPrice.value"
                    :currency="oldPrice.currency"
                />
                <div v-if="bonus" class="text-grey text-sm product-price-panel__bonus">
                    + {{ computedBonus }} бонусов
                </div>
            </div>

            <buy-button
                class="product-price-panel__btn"
                :class="{ 'btn--outline': !isTablet }"
                @click.prevent="onBuyBtnClick"
                :disabled="!canBuy"
            >
                {{ canBuy ? 'В корзину' : 'Нет в наличии' }}
            </buy-button>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';
import BuyButton from '@components/BuyButton/BuyButton.vue';

import { fileExtension } from '@enums';
import { generatePictureSourcePath } from '@util/file';
import { preparePrice } from '@util';
import '@images/sprites/wishlist-middle.svg';
import './ProductPricePanel.css';

export default {
    name: 'product-price-panel',

    components: {
        VSvg,
        VPicture,

        Price,
        BuyButton,
    },

    props: {
        name: {
            type: String,
        },

        image: {
            type: [String, Object],
        },

        price: {
            type: Object,
        },

        oldPrice: {
            type: Object,
        },

        bonus: {
            type: [String, Number],
        },

        canBuy: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        smallImage() {
            if (this.image && this.image.id)
                return generatePictureSourcePath(56, 56, this.image.id, fileExtension.image.WEBP);
            return this.image;
        },

        defaultImage() {
            if (this.image && this.image.id)
                return generatePictureSourcePath(56, 56, this.image.id, this.image.sourceExt);
            return this.image;
        },

        computedBonus() {
            return preparePrice(this.bonus);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        onWishlistBtnClick() {
            this.$emit('addWishlist');
        },

        onBuyBtnClick() {
            this.$emit('addItem');
        },
    },
};
</script>
