<template>
    <general-popup-panel
        popover-class="tooltip--white cart-header-panel"
        header="Мой заказ"
        trigger="hover"
        show-bottom
        :disabled="!hasSession"
    >
        <slot />
        <template v-slot:body>
            <ul class="cart-header-panel__list" v-if="cartTypes[0]">
                <cart-panel-product-card
                    class="cart-header-panel__list-item"
                    v-for="{ p: product } in cartTypes[0].items"
                    :key="product.id"
                    :product-id="product.id"
                    :type="product.type"
                    :name="product.name"
                    :image="product.image"
                    :price="product.price"
                    :old-price="product.oldPrice"
                    href="/catalog"
                />
            </ul>
        </template>
        <template v-slot:bottom>
            <v-button class="btn--outline cart-header-panel__controls-btn" @click="onToCart">
                В корзину
            </v-button>
            <div class="cart-header-panel__total" v-if="cartItemsCount > 0">
                {{ $tc('cart.items', cartItemsCount) }} на сумму
                <price tag="div" class="text-bold" v-bind="productItemsSum" />
            </div>
            <div class="cart-header-panel__total" v-else>
                Ваша корзина пуста
            </div>
        </template>
    </general-popup-panel>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import Price from '@components/Price/Price.vue';

import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';
import CartPanelProductCard from '@components/CartPanelProductCard/CartPanelProductCard.vue';

import { mapActions, mapState, mapGetters } from 'vuex';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM, CART_TYPES } from '@store/modules/Cart/getters';

import '@images/sprites/cross.svg';
import './CartHeaderPanel.css';

export default {
    name: 'cart-header-panel',

    components: {
        VLink,
        VButton,

        Price,

        GeneralPopupPanel,
        CartPanelProductCard,
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, CART_TYPES, PRODUCT_ITEMS_SUM]),
    },

    methods: {
        onToCart() {
            this.$router.push({ path: '/cart' });
        },
    },
};
</script>
