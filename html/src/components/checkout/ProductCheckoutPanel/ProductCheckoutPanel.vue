<template>
    <div class="product-checkout-panel">
        <div class="product-checkout-panel__item">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Получатель</h2>
            </div>
            <ul class="product-checkout-panel__item-list">
                <checkout-option-card
                    class="product-checkout-panel__item-card"
                    v-for="recipient in checkoutData.recipients"
                    :key="recipient.id"
                    :selected="checkoutData.recipientID === recipient.id"
                    @cardClick="SET_DATA_PROP({ prop: 'recipientID', value: recipient.id })"
                >
                    <p>{{ recipient.fullname }}</p>
                    <p>{{ recipient.tel }}</p>
                    <p>{{ recipient.email }}</p>
                </checkout-option-card>
            </ul>
        </div>
        <div class="product-checkout-panel__item">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Способ получения</h2>
            </div>
            <ul class="product-checkout-panel__item-list">
                <checkout-option-card
                    class="product-checkout-panel__item-card"
                    v-for="method in deliveryMethods"
                    :key="method.id"
                    :selected="checkoutData.deliveryMethodID === method.id"
                    readonly
                    @cardClick="SET_DATA_PROP({ prop: 'deliveryMethodID', value: method.id })"
                >
                    <p class="text-bold">{{ method.title }}</p>
                    <p>{{ method.price }}</p>
                    <p class="text-grey text-sm">{{ method.description }}</p>
                </checkout-option-card>
            </ul>
        </div>
        <div class="product-checkout-panel__item">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Адрес доставки</h2>
            </div>
            <ul v-if="isDelivery" class="product-checkout-panel__item-list">
                <checkout-option-card
                    class="product-checkout-panel__item-card"
                    v-for="address in addresses"
                    :key="address.id"
                    :selected="checkoutData.addressID === address.id"
                    @cardClick="SET_DATA_PROP({ prop: 'addressID', value: address.id })"
                >
                    {{ address.description }}
                </checkout-option-card>
            </ul>
        </div>
        <div class="product-checkout-panel__item">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Дата и время доставки</h2>
            </div>
            <ul class="product-checkout-panel__item-list">
                <checkout-option-card
                    class="product-checkout-panel__item-card"
                    v-for="type in deliveryTypes"
                    :key="type.id"
                    :selected="checkoutData.deliveryTypeID === type.id"
                    readonly
                    @cardClick="SET_DATA_PROP({ prop: 'deliveryTypeID', value: type.id })"
                >
                    <p class="text-bold">{{ type.title }}</p>
                    <p>{{ type.description }}</p>
                    <p class="text-grey text-sm">{{ type.note }}</p>
                </checkout-option-card>
            </ul>
            <div
                class="product-checkout-panel__item product-checkout-panel__item--child"
                v-for="packageItem in packages.items"
                :key="packageItem.id"
            >
                <div class="product-checkout-panel__item-header">
                    <h3 class="product-checkout-panel__item-header-hl">{{ packageItem.title }}</h3>
                </div>
                <ul class="product-checkout-panel__item-list">
                    <checkout-product-card
                        class="product-checkout-panel__item-card"
                        v-for="item in packageItem.products"
                        :key="item.id"
                        :name="item.name"
                        :image="item.image"
                    />
                </ul>
            </div>
        </div>
        <div class="product-checkout-panel__item">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Способ оплаты</h2>
            </div>
        </div>
    </div>
</template>
<script>
import CheckoutOptionCard from '../CheckoutOptionCard/CheckoutOptionCard.vue';
import CheckoutProductCard from '../CheckoutProductCard/CheckoutProductCard.vue';

import { mapState, mapActions } from 'vuex';
import {
    NAME as CHECKOUT_MODULE,
    CHECKOUT_DATA,
    DELIVERY_TYPES,
    ADDRESSES,
    DELIVERY_METHODS,
    PACKAGES,
} from '../../../store/modules/Checkout';
import { SET_DATA_PROP, FETCH_ADDRESSES, FETCH_PACKAGES } from '../../../store/modules/Checkout/actions';

import './ProductCheckoutPanel.css';

const deliveryMethods = {
    delivery: 1,
    express: 2,
    pickup: 3,
};

export default {
    name: 'product-checkout-panel',

    components: {
        CheckoutProductCard,
        CheckoutOptionCard,
    },

    computed: {
        ...mapState(CHECKOUT_MODULE, [CHECKOUT_DATA, DELIVERY_METHODS, DELIVERY_TYPES, ADDRESSES, PACKAGES]),
        ...mapState(CHECKOUT_MODULE, {
            isDelivery: state =>
                state.checkoutData.deliveryMethodID === deliveryMethods.delivery ||
                state.checkoutData.deliveryMethodID === deliveryMethods.express,
        }),
    },

    watch: {
        ['checkoutData.deliveryMethodID']: {
            handler(value) {
                this[FETCH_ADDRESSES](value);
            },
        },

        ['checkoutData.deliveryTypeID']: {
            handler(value) {
                this[FETCH_PACKAGES](value);
            },
        },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [SET_DATA_PROP, FETCH_ADDRESSES, FETCH_PACKAGES]),
    },
};
</script>