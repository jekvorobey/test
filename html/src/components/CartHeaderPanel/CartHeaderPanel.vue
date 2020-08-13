<template>
    <general-popup-panel
        popover-class="tooltip--white cart-header-panel"
        header="Мой заказ"
        trigger="hover"
        offset="8"
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
            <v-button class="btn--outline cart-header-panel__controls-btn" @click="onToCart">
                Оформить заказ
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
import VScroll from '@controls/VScroll/VScroll.vue';

import Price from '@components/Price/Price.vue';

import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';
import CartPanelProductCard from '@components/CartPanelProductCard/CartPanelProductCard.vue';

import { mapActions, mapState, mapGetters } from 'vuex';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM, CART_TYPES, CART_ITEMS } from '@store/modules/Cart/getters';

import { generateProductUrl } from '@util/catalog';
import '@images/sprites/cross.svg';
import './CartHeaderPanel.css';

export default {
    name: 'cart-header-panel',

    components: {
        VLink,
        VButton,
        VScroll,

        Price,

        GeneralPopupPanel,
        CartPanelProductCard,
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, CART_ITEMS, PRODUCT_ITEMS_SUM]),

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
