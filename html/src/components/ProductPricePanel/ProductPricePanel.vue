<template>
    <div class="product-price-panel">
        <div class="container product-price-panel__container">
            <div class="product-price-panel__name">{{ name }}</div>
            <price class="text-bold product-price-panel__price" :value="price.value" :currency="price.currency" />
            <price
                v-if="oldPrice"
                class="text-grey text-sm text-strike product-price-panel__price"
                :value="oldPrice.value"
                :currency="oldPrice.currency"
            />
            <v-button class="product-price-panel__btn" @click.prevent="onBuyBtnClick">Добавить</v-button>
            <button class="product-price-panel__btn" @click.prevent="onWishlistBtnClick">
                <v-svg name="wishlist-middle" width="24" height="24" />
            </button>
        </div>
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VButton from '../controls/VButton/VButton.vue';

import Price from '../Price/Price.vue';
import '../../assets/images/sprites/wishlist-middle.svg';
import './ProductPricePanel.css';

export default {
    name: 'product-price-panel',

    components: {
        VSvg,
        VButton,
        Price,
    },

    props: {
        name: {
            type: String,
        },

        price: {
            type: Object,
        },

        oldPrice: {
            type: Object,
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

