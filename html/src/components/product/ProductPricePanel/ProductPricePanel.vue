<template>
    <div class="product-price-panel">
        <div class="container product-price-panel__container">
            <div class="product-price-panel__img" v-if="image">
                <v-picture :image="image" alt="">
                    <template v-slot:source="{ image, lazy }">
                        <source :data-srcset="generateSourcePath(56, 56, image.id, 'webp')" type="image/webp" />
                    </template>
                    <template v-slot:fallback="{ image, lazy, alt }">
                        <img
                            class="blur-up lazyload v-picture__img"
                            :data-src="generateSourcePath(56, 56, image.id, image.sourceExt)"
                            :alt="alt"
                        />
                    </template>
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

            <v-button
                class="product-price-panel__btn"
                :class="{ 'btn--outline': !isTablet }"
                @click.prevent="onBuyBtnClick"
                :disabled="!canBuy"
            >
                {{ canBuy ? 'В корзину' : 'Нет в наличии' }}
            </v-button>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import Price from '@components/Price/Price.vue';

import { generatePictureSourcePath } from '@util/media';
import { preparePrice } from '@util';
import '@images/sprites/wishlist-middle.svg';
import './ProductPricePanel.css';

export default {
    name: 'product-price-panel',

    components: {
        VSvg,
        VButton,
        VPicture,
        Price,
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
        computedBonus() {
            return preparePrice(this.bonus);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        onWishlistBtnClick() {
            this.$emit('addWishlist');
        },

        onBuyBtnClick() {
            this.$emit('addItem');
        },
    },
};
</script>
