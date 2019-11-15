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
                <h2 class="product-checkout-panel__item-header-hl">
                    {{ isDelivery ? 'Адрес доставки' : 'Пункт самовывоза' }}
                </h2>
            </div>
            <ul v-if="isDelivery" class="product-checkout-panel__item-list">
                <checkout-option-card
                    class="product-checkout-panel__item-card"
                    v-for="address in addressesByMethod.items"
                    :key="address.id"
                    :selected="checkoutData.addressID === address.id"
                    @cardClick="SET_DATA_PROP({ prop: 'addressID', value: address.id })"
                >
                    {{ address.description }}
                </checkout-option-card>
            </ul>
            <checkout-address-panel v-else />
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
                v-for="packageItem in packagesByType.items"
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
import CheckoutAddressPanel from '../CheckoutAddressPanel/CheckoutAddressPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import {
    NAME as CHECKOUT_MODULE,
    CHECKOUT_DATA,
    DELIVERY_TYPES,
    ADDRESSES,
    DELIVERY_METHODS,
    PACKAGES,
} from '../../../store/modules/Checkout';
import { SET_DATA_PROP, FETCH_ADDRESSES, FETCH_PACKAGES } from '../../../store/modules/Checkout/actions';
import { ADDRESSES_BY_METHOD, PACKAGES_BY_TYPE } from '../../../store/modules/Checkout/getters';

import { deliveryMethods } from '../../../assets/scripts/constants';
import './ProductCheckoutPanel.css';

export default {
    name: 'product-checkout-panel',

    components: {
        CheckoutProductCard,
        CheckoutOptionCard,
        CheckoutAddressPanel,
    },

    computed: {
        ...mapState(CHECKOUT_MODULE, [CHECKOUT_DATA, DELIVERY_METHODS, DELIVERY_TYPES, ADDRESSES, PACKAGES]),
        ...mapGetters(CHECKOUT_MODULE, [ADDRESSES_BY_METHOD, PACKAGES_BY_TYPE]),

        isDelivery() {
            const currentMethod = this[ADDRESSES_BY_METHOD].methodID;
            return currentMethod === deliveryMethods.DELIVERY || currentMethod === deliveryMethods.EXPRESS;
        },
    },

    watch: {
        isDelivery(value) {
            this[SET_DATA_PROP]({
                prop: 'addressID',
                value: this[ADDRESSES_BY_METHOD].items[0].id,
            });
        },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [SET_DATA_PROP, FETCH_ADDRESSES, FETCH_PACKAGES]),
    },
};
</script>
