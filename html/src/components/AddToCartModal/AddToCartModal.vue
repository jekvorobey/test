<template>
    <general-modal type="wide" class="add-to-cart-modal" :header="header" @close="onClose">
        <template v-slot:content>
            <h3 class="add-to-cart-modal__hl">{{ header }}</h3>
            <div class="add-to-cart-modal__body" v-if="product">
                <cart-product-card
                    class="add-to-cart-modal__card"
                    :key="product.id"
                    :product-id="product.id"
                    :type="product.type"
                    :name="product.name"
                    :image="product.image"
                    :price="product.price"
                    :old-price="product.oldPrice"
                    :count="cartItem.count"
                    href="/catalog"
                    @countChange="ADD_CART_ITEM({ offerId: product.id, count: $event.count })"
                />
                <div class="add-to-cart-modal__panel">
                    <div class="add-to-cart-modal__panel-info">
                        В корзине {{ $tc('cart.items', cartItemsCount) }} на сумму
                        {{ productItemsSum }}
                    </div>
                    <v-button class="btn--outline add-to-cart-modal__panel-btn" @click="onClose">
                        Продолжить покупки
                    </v-button>
                    <v-button class="add-to-cart-modal__panel-btn" to="/cart">
                        Перейти в корзину
                    </v-button>
                </div>
            </div>
            <v-spinner class="add-to-cart-modal__spinner" :show="!product" />
        </template>
    </general-modal>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';
import VButton from '../controls/VButton/VButton.vue';
import VSpinner from '../controls/VSpinner/VSpinner.vue';

import CartProductCard from '../CartProductCard/CartProductCard.vue';
import GeneralModal from '../GeneralModal/GeneralModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import { NAME as CART_MODULE, CART_DATA } from '../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../store/modules/Cart/actions';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '../../store/modules/Cart/getters';

import { generatePictureSourcePath } from '../../util/images';
import './AddToCartModal.css';

export const NAME = 'add-to-cart-modal';

export default {
    name: NAME,

    components: {
        VButton,
        VSpinner,

        GeneralModal,
        CartProductCard,
    },

    data() {
        return {
            cartItem: null,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),
        ...mapState(CART_MODULE, [CART_DATA]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),

        product() {
            return this.cartItem ? this.cartItem.p : null;
        },

        header() {
            return 'Товар добавлен в корзину';
        },
    },

    watch: {
        [CART_DATA]() {
            const data = this[CART_DATA][this.modalState.type];
            this.cartItem = data ? data.items.find(i => i.p.id === this.modalState.offerId) : null;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    mounted() {
        const data = this[CART_DATA][this.modalState.type];
        this.cartItem = data ? data.items.find(i => i.p.id === this.modalState.offerId) : null;
        if (!this.cartItem) this[ADD_CART_ITEM]({ offerId: this.modalState.offerId });
    },
};
</script>
