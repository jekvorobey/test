<template>
    <general-popup-panel
        popover-class="tooltip--white cart-header-panel"
        header="Мой заказ"
        trigger="hover"
        show-bottom
        :disabled="isTabletLg || !hasSession"
    >
        <slot />
        <template v-slot:body>
            <v-scroll class="cart-header-panel__scroll">
                <ul class="cart-header-panel__list">
                    <cart-panel-product-card
                        class="cart-header-panel__list-item"
                        v-for="{ p: product, type } in cartItems"
                        :key="product.id"
                        :type="type"
                        :name="product.name"
                        :note="product.note"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :href="product.url"
                    />
                </ul>
            </v-scroll>
        </template>
        <template v-slot:bottom>
            <v-button class="btn--outline cart-header-panel__controls-btn" @click="onToCart">Оформить заказ</v-button>
            <div class="cart-header-panel__total" v-if="cartItemsCount > 0">
                {{ productCount }} на сумму
                <price tag="div" class="text-bold" v-bind="productItemsSum" />
            </div>
            <div class="cart-header-panel__total" v-else>Ваша корзина пуста</div>
        </template>
    </general-popup-panel>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VScroll from '@controls/VScroll/VScroll.vue';

import Price from '@components/Price/Price.vue';

import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';
import CartPanelProductCard from '@components/CartPanelProductCard/CartPanelProductCard.vue';

import { mapState, mapGetters } from 'vuex';
import { SCROLL } from '@store';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM, CART_ITEMS } from '@store/modules/Cart/getters';

import { pluralize } from '@util';
import '@images/sprites/cross.svg';
import './CartHeaderPanel.css';

export default {
    name: 'cart-header-panel',

    components: {
        VButton,
        VScroll,

        Price,

        GeneralPopupPanel,
        CartPanelProductCard,
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, CART_ITEMS, PRODUCT_ITEMS_SUM]),

        productCount() {
            const { cartItemsCount } = this;
            return `${cartItemsCount} ${pluralize(cartItemsCount, ['продукт', 'продукта', 'продуктов'])}`;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        onToCart() {
            this.$router.push({ path: '/cart' });
        },
    },
};
</script>
