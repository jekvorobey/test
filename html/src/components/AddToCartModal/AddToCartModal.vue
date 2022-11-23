<template>
    <general-modal type="wide" class="add-to-cart-modal" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="add-to-cart-modal__body">
                <h3 class="add-to-cart-modal__hl">{{ header }}</h3>
                <template v-if="product">
                    <cart-product-card
                        class="add-to-cart-modal__card"
                        :key="product.id"
                        :offer-id="product.id"
                        :product-id="product.productId"
                        :type="product.type"
                        :name="product.name"
                        :image="product.image"
                        :price="modifiedPrice"
                        :old-price="modifiedOldPrice"
                        :count="cartItem.count"
                        :max-count="product.stock && product.stock.qty"
                        show-count
                        :href="href"
                        @countChange="onCountChange($event.count, product)"
                    />
                    <div class="add-to-cart-modal__panel" v-if="!isTablet">
                        <div class="add-to-cart-modal__panel-info">
                            <template v-if="cartItemsCount.value > 0">
                                В корзине {{ $tc('cart.items', cartItemsCount) }} <br />на сумму
                                <price v-bind="productItemsSum" />
                            </template>
                            <template v-else>В корзине {{ $tc('cart.items', cartItemsCount) }}</template>
                        </div>
                        <v-button class="btn--outline add-to-cart-modal__panel-btn" @click="onClose">
                            Продолжить покупки
                        </v-button>
                        <v-button v-if="!isCart" class="add-to-cart-modal__panel-btn" to="/cart">
                            Перейти в корзину
                        </v-button>
                    </div>
                </template>
                <v-spinner class="add-to-cart-modal__spinner" :show="!product" />
            </div>

            <retail-rocket-container
                v-if="product"
                data-retailrocket-markup-block="5f21672797a5282edc07d7cf"
                :key="product.id"
                :data-product-id="product.id"
                :data-auth="hasSession ? 'true' : 'false'"
                :data-user-moderation="canBuy ? 'true' : 'false'"
            />

            <div class="add-to-cart-modal__panel" v-if="isTablet">
                <div class="add-to-cart-modal__panel-info">
                    <template v-if="productItemsSum.value > 0">
                        В корзине {{ $tc('cart.items', cartItemsCount) }} на сумму
                        <price v-bind="productItemsSum" />
                    </template>
                    <template v-else>В корзине {{ $tc('cart.items', cartItemsCount) }}</template>
                </div>
                <v-link class="btn--outline add-to-cart-modal__panel-link" @click="onClose">Продолжить</v-link>
                <v-button v-if="!isCart" class="add-to-cart-modal__panel-btn" to="/cart">Перейти в корзину</v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import Price from '@components/Price/Price.vue';

import CartProductCard from '@components/CartProductCard/CartProductCard.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as CART_MODULE, CART_DATA } from '@store/modules/Cart';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '@store/modules/Cart/getters';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';
import { NAME as AUTH_MODULE, HAS_SESSION, CAN_BUY, USER } from '@store/modules/Auth';

import { modalName } from '@enums';
import './AddToCartModal.css';

const NAME = modalName.general.ADD_TO_CART;

export default {
    name: NAME,

    components: {
        VLink,
        VButton,
        VSpinner,

        Price,
        GeneralModal,
        CartProductCard,

        RetailRocketContainer,
    },

    data() {
        return {
            cartItem: null,
            retailRocketIsReady: false
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),
        ...mapState(CART_MODULE, [CART_DATA]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

        product() {
            return this.cartItem ? this.cartItem.p : null;
        },

        header() {
            return 'Товар добавлен в корзину';
        },

        isTablet() {
            return this.$mq.tablet;
        },

        href() {
            const name = this.product.code;
            return name ? `/product/${name}` : '/catalog';
        },

        isCart() {
            return this.$route.name === 'Cart';
        },

        modifiedPrice() {
            return this.product.price
                ? Object.assign(this.product.price, { isPriceHidden: this.product.isPriceHidden })
                : { isPriceHidden: this.product.isPriceHidden };
        },

        modifiedOldPrice() {
            return this.product.oldPrice
                ? Object.assign(this.product.oldPrice, { isPriceHidden: this.product.isPriceHidden })
                : null;
        },
    },

    watch: {
        [CART_DATA]() {
            const data = this[CART_DATA][this.modalState.type];
            this.cartItem = data ? data.items.find((i) => i.p.id === this.modalState.offerId) : null;
        },

        modalState() {
            this.fetchData();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        onCountChange(count, product) {
            const { referralCode } = this.modalState;
            const { id, stock } = product;
            this[ADD_CART_ITEM]({ offerId: id, storeId: stock.storeId, count: count, referrerCode: referralCode });
        },

        onPreview(code) {
            const { referralCode } = this.modalState;
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
            this[CHANGE_MODAL_STATE]({ name: modalName.general.QUICK_VIEW, open: true, state: { code, referralCode } });
        },

        onAddToCart(item) {
            const { referralCode } = this.modalState;

            this[CHANGE_MODAL_STATE]({
                name: NAME,
                open: true,
                state: {
                    offerId: item.id,
                    storeId: item.stock.storeId,
                    type: item.type,
                    referralCode,
                },
            });
        },

        onToggleFavorite({ productId }) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        fetchData() {
            const { offerId, storeId, referralCode, type, cookieName } = this.modalState;
            const data = this[CART_DATA][type];

            this.cartItem = data ? data.items.find((i) => i.p.id === offerId) : null;
            if (!this.cartItem) this[ADD_CART_ITEM]({ offerId, storeId, referrerCode: referralCode, cookieName });
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false, state: null });
        },
    },

    mounted() {
        this.fetchData();
    },
};
</script>
