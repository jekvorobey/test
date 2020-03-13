<template>
    <general-modal type="wide" class="add-to-cart-modal" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="add-to-cart-modal__body">
                <h3 class="add-to-cart-modal__hl">{{ header }}</h3>
                <template v-if="product">
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
                        @countChange="
                            ADD_CART_ITEM({
                                offerId: product.id,
                                storeId: product.stock.storeId,
                                count: $event.count,
                            })
                        "
                    />
                    <div class="add-to-cart-modal__panel" v-if="!isTablet">
                        <div class="add-to-cart-modal__panel-info">
                            В корзине {{ $tc('cart.items', cartItemsCount) }} на сумму
                            <price v-bind="productItemsSum" />
                        </div>
                        <v-button class="btn--outline add-to-cart-modal__panel-btn" @click="onClose">
                            Продолжить покупки
                        </v-button>
                        <v-button class="add-to-cart-modal__panel-btn" to="/cart">
                            Перейти в корзину
                        </v-button>
                    </div>
                </template>
                <v-spinner class="add-to-cart-modal__spinner" :show="!product" />
            </div>

            <div class="add-to-cart-modal__relative">
                <h3 class="add-to-cart-modal__relative-hl">С этим продуктом покупают</h3>
                <transition name="fade-in">
                    <ul class="add-to-cart-modal__relative-list" v-if="products && products.length > 0">
                        <li class="add-to-cart-modal__relative-item" v-for="item in products" :key="item.id">
                            <catalog-product-card
                                class="add-to-cart-modal__relative-card"
                                :product-id="item.id"
                                :name="item.name"
                                :type="item.type"
                                :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                                :image="item.image"
                                :price="item.price"
                                :old-price="item.oldPrice"
                                :tags="item.tags"
                                :rating="item.rating"
                                :show-buy-btn="item.stock.qty > 0"
                                @addItem="onAddToCart(item)"
                                @preview="onPreview(item.code)"
                            />
                        </li>
                    </ul>
                </transition>
            </div>

            <div class="add-to-cart-modal__panel" v-if="isTablet">
                <div class="add-to-cart-modal__panel-info">
                    В корзине {{ $tc('cart.items', cartItemsCount) }} на сумму
                    <price v-bind="productItemsSum" />
                </div>
                <v-link class="btn--outline add-to-cart-modal__panel-link" @click="onClose">
                    Продолжить
                </v-link>
                <v-button class="add-to-cart-modal__panel-btn" to="/cart">
                    Перейти в корзину
                </v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';
import VButton from '../controls/VButton/VButton.vue';
import VSpinner from '../controls/VSpinner/VSpinner.vue';

import Price from '../Price/Price.vue';

import CatalogProductCard from '../CatalogProductCard/CatalogProductCard.vue';
import CartProductCard from '../CartProductCard/CartProductCard.vue';
import GeneralModal from '../GeneralModal/GeneralModal.vue';
import { NAME as QUICK_VIEW_MODAL_NAME } from '../QuickViewModal/QuickViewModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import { NAME as CART_MODULE, CART_DATA, RELATIVE_PRODUCTS } from '../../store/modules/Cart';
import { ADD_CART_ITEM, FETCH_RELATIVE_PRODUCTS } from '../../store/modules/Cart/actions';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '../../store/modules/Cart/getters';

import { getRandomIntInclusive } from '../../util/helpers';
import { generatePictureSourcePath } from '../../util/media';
import './AddToCartModal.css';

export const NAME = 'add-to-cart-modal';

export default {
    name: NAME,

    components: {
        VLink,
        VButton,
        VSpinner,

        Price,
        GeneralModal,
        CartProductCard,
        CatalogProductCard,
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
        ...mapState(CART_MODULE, [CART_DATA, RELATIVE_PRODUCTS]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),

        product() {
            return this.cartItem ? this.cartItem.p : null;
        },

        header() {
            return 'Товар добавлен в корзину';
        },

        products() {
            return this.isTablet ? this.relativeProducts.slice(0, 2) : this.relativeProducts.slice(0, 3);
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        [CART_DATA]() {
            const data = this[CART_DATA][this.modalState.type];
            this.cartItem = data ? data.items.find(i => i.p.id === this.modalState.offerId) : null;
        },

        modalState() {
            this.fetchData();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM, FETCH_RELATIVE_PRODUCTS]),

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
            this[CHANGE_MODAL_STATE]({ name: QUICK_VIEW_MODAL_NAME, open: true, state: { code } });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: NAME,
                open: true,
                state: { offerId: item.id, storeId: item.stock.storeId, type: item.type },
            });
        },

        fetchData() {
            const data = this[CART_DATA][this.modalState.type];
            this.cartItem = data ? data.items.find(i => i.p.id === this.modalState.offerId) : null;
            if (!this.cartItem)
                this[ADD_CART_ITEM]({ offerId: this.modalState.offerId, storeId: this.modalState.storeId });
            this[FETCH_RELATIVE_PRODUCTS]({ page: getRandomIntInclusive(1, 4) });
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    mounted() {
        this.fetchData();
    },
};
</script>
