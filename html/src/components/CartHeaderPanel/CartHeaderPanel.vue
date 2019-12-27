<template>
    <general-popup-panel
        popover-class="tooltip--white cart-header-panel"
        header="Мой заказ"
        :open="isCartOpen"
        @close="onClose"
        @hide="onClose"
        show-bottom
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
            <div class="cart-header-panel__total">
                {{ $tc('cart.items', cartItemsCount) }} на сумму
                <div class="text-bold">
                    {{ productItemsSum }}
                </div>
            </div>
        </template>
    </general-popup-panel>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';
import VButton from '../controls/VButton/VButton.vue';

import GeneralPopupPanel from '../GeneralPopupPanel/GeneralPopupPanel.vue';
import CartPanelProductCard from '../CartPanelProductCard/CartPanelProductCard.vue';

import { mapActions, mapState, mapGetters } from 'vuex';
import { IS_CART_OPEN } from '../../store';
import { SET_CITY_CONFIRMATION_OPEN, SET_CART_OPEN } from '../../store/actions';

import { NAME as CART_MODULE, CART_DATA } from '../../store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM, CART_TYPES } from '../../store/modules/Cart/getters';

import '../../assets/images/sprites/cross.svg';
import './CartHeaderPanel.css';

export default {
    name: 'cart-header-panel',

    components: {
        VLink,
        VButton,

        GeneralPopupPanel,
        CartPanelProductCard,
    },

    computed: {
        ...mapState([IS_CART_OPEN]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, CART_TYPES, PRODUCT_ITEMS_SUM]),
    },

    methods: {
        ...mapActions([SET_CART_OPEN]),

        onToCart() {
            this.$router.push({ path: '/cart' });
            this.onClose();
        },

        onClose() {
            this[SET_CART_OPEN](false);
        },
    },
};
</script>