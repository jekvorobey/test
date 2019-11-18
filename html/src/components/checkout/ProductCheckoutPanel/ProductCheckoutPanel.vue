<template>
    <div class="product-checkout-panel">
        <div class="product-checkout-panel__item">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Получатель</h2>
                <v-link class="product-checkout-panel__item-header-link" tag="button" @click="onAddRecipient">
                    <v-svg name="plus" width="24" height="24" />&nbsp;Добавить нового получателя
                </v-link>
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
                    v-for="method in receiveMethods"
                    :key="method.id"
                    :selected="checkoutData.receiveMethodID === method.id"
                    readonly
                    @cardClick="SET_RECEIVE_METHOD(method)"
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
                <v-link
                    v-if="isDelivery"
                    class="product-checkout-panel__item-header-link"
                    tag="button"
                    @click="onAddAddress"
                >
                    <v-svg name="plus" width="24" height="24" />&nbsp;Добавить новый адрес
                </v-link>
                <v-link
                    v-else-if="selectedPickupPoint"
                    class="product-checkout-panel__item-header-link"
                    tag="button"
                    @click="onChangePickupPoint"
                >
                    <v-svg name="pin" width="24" height="24" />&nbsp;Выбрать другой
                </v-link>
            </div>
            <transition name="fade-in">
                <ul v-if="isDelivery" class="product-checkout-panel__item-list">
                    <checkout-option-card
                        class="product-checkout-panel__item-card"
                        v-for="address in addresses"
                        :key="address.id"
                        :selected="selectedAddress && selectedAddress.id === address.id"
                        @cardClick="SET_SELECTED_ADDRESS(address)"
                    >
                        {{ address.description }}
                    </checkout-option-card>
                </ul>
                <checkout-address-panel v-else @changeAddress="onChangePickupPoint" />
            </transition>
        </div>
        <transition name="fade-in">
            <div v-if="showPanels">
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
        </transition>

        <transition name="modal">
            <checkout-pickup-point-modal />
        </transition>
    </div>
</template>
<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VLink from '../../controls/VLink/VLink.vue';
import CheckoutPickupPointModal from '../CheckoutPickupPointModal/CheckoutPickupPointModal.vue';
import CheckoutOptionCard from '../CheckoutOptionCard/CheckoutOptionCard.vue';
import CheckoutProductCard from '../CheckoutProductCard/CheckoutProductCard.vue';
import CheckoutAddressPanel from '../CheckoutAddressPanel/CheckoutAddressPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import {
    NAME as CHECKOUT_MODULE,
    CHECKOUT_DATA,
    DELIVERY_TYPES,
    ADDRESSES,
    PACKAGES,
    PICKUP_POINTS,
    SELECTED_ADDRESS,
    SELECTED_PICKUP_POINT,
    RECEIVE_METHODS,
} from '../../../store/modules/Checkout';

import {
    SET_DATA_PROP,
    FETCH_ADDRESSES,
    FETCH_PACKAGES,
    FETCH_PICKUP_POINTS,
    SET_SELECTED_PICKUP_POINT,
    SET_RECEIVE_METHOD,
    SET_SELECTED_ADDRESS,
} from '../../../store/modules/Checkout/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { deliveryMethods, receiveTypes } from '../../../assets/scripts/constants';
import '../../../assets/images/sprites/plus.svg';
import './ProductCheckoutPanel.css';
import { PACKAGES_BY_TYPE } from '../../../store/modules/Checkout/getters';

export default {
    name: 'product-checkout-panel',

    components: {
        VSvg,
        VLink,
        CheckoutPickupPointModal,
        CheckoutProductCard,
        CheckoutOptionCard,
        CheckoutAddressPanel,
    },

    computed: {
        ...mapState(CHECKOUT_MODULE, [
            CHECKOUT_DATA,
            RECEIVE_METHODS,
            DELIVERY_TYPES,

            SELECTED_ADDRESS,
            ADDRESSES,

            SELECTED_PICKUP_POINT,
            PICKUP_POINTS,

            PACKAGES,
        ]),

        ...mapGetters(CHECKOUT_MODULE, [PACKAGES_BY_TYPE]),

        showPanels() {
            return this.isDelivery ? this[SELECTED_ADDRESS] : this[SELECTED_PICKUP_POINT];
        },

        isDelivery() {
            const currentMethod = this[CHECKOUT_DATA].receiveMethodID;
            return currentMethod === receiveTypes.DELIVERY || currentMethod === receiveTypes.EXPRESS;
        },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [
            FETCH_ADDRESSES,
            FETCH_PACKAGES,
            FETCH_PICKUP_POINTS,
            SET_DATA_PROP,
            SET_SELECTED_PICKUP_POINT,
            SET_SELECTED_ADDRESS,
            SET_RECEIVE_METHOD,
        ]),

        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onChangePickupPoint() {
            this[CHANGE_MODAL_STATE]({ name: 'checkout-pickup-point-modal', open: true });
        },

        onAddAddress() {
            this[CHANGE_MODAL_STATE]({ name: 'checkout-address-modal', open: true });
        },

        onAddRecipient() {
            this[CHANGE_MODAL_STATE]({ name: 'checkout-address-modal', open: true });
        },
    },
};
</script>
