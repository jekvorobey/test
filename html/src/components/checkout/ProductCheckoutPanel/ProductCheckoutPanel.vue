<template>
    <div class="product-checkout-panel">
        <div class="product-checkout-panel__item">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Получатель</h2>
            </div>
            <ul class="product-checkout-panel__item-list">
                <checkout-option-card
                    class="product-checkout-panel__item-card"
                    v-for="recipient in recipients"
                    :key="recipient.id"
                    :selected="recipient.id === selectedRecipient.id"
                    @cardClick="SET_RECIPIENT(recipient)"
                >
                    <p>{{ recipient.name }}</p>
                    <p>{{ recipient.email }}</p>
                    <p>{{ recipient.phone }}</p>
                </checkout-option-card>
            </ul>
            <v-link class="product-checkout-panel__item-header-link" tag="button" @click="onAddRecipient">
                <v-svg name="plus" width="24" height="24" />&nbsp;Добавить нового получателя
            </v-link>
        </div>
        <div class="product-checkout-panel__item product-checkout-panel__item--receive-method">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">
                    Способ получения&nbsp;<v-spinner width="24" height="24" :show="isReceiveMethodPending" />
                </h2>
            </div>
            <ul class="product-checkout-panel__item-list">
                <checkout-option-card
                    class="product-checkout-panel__item-card"
                    v-for="method in receiveMethods"
                    :key="method.id"
                    :selected="method.id === selectedReceiveMethodID"
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
                    {{ isDelivery ? 'Адрес доставки' : 'Пункт самовывоза' }}&nbsp;
                    <v-spinner width="24" height="24" :show="isAddressPending" />
                </h2>
            </div>
            <transition name="fade-in">
                <ul v-if="isDelivery" class="product-checkout-panel__item-list">
                    <checkout-option-card
                        class="product-checkout-panel__item-card"
                        v-for="address in addresses"
                        :key="address.id"
                        :selected="selectedAddress && address.id === selectedAddress.id"
                        @cardClick="SET_ADDRESS(address)"
                    >
                        {{ address.description }}
                    </checkout-option-card>
                </ul>
                <checkout-address-panel v-else @changeAddress="onChangePickupPoint" />
            </transition>
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
                <v-svg name="pin" width="16" height="16" />&nbsp;&nbsp;Выбрать другой
            </v-link>
        </div>

        <div class="product-checkout-panel__item product-checkout-panel__item--delivery">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Дата и время доставки</h2>
            </div>
            <transition name="fade-in" mode="out-in">
                <div key="not-empty" v-if="showPanels">
                    <ul
                        class="product-checkout-panel__item-list"
                        v-if="computedDeliveryTypes && computedDeliveryTypes.length > 1"
                    >
                        <checkout-option-card
                            class="product-checkout-panel__item-card"
                            v-for="deliveryType in computedDeliveryTypes"
                            :key="`delivery-type-${deliveryType.id}-${deliveryType.methodID}`"
                            :selected="deliveryType.id === selectedDeliveryType.id"
                            readonly
                            @cardClick="onSetDeliveryType(deliveryType.id)"
                        >
                            <p class="text-bold">{{ deliveryType.title }}</p>
                            <p>{{ deliveryType.description }}</p>
                            <p class="text-grey text-sm">{{ generatePackageNote(deliveryType) }}</p>
                        </checkout-option-card>
                    </ul>
                    <transition-group v-if="selectedDeliveryType" tag="ul" name="chunk-item">
                        <li
                            class="product-checkout-panel__item product-checkout-panel__item--child"
                            v-for="chunkItem in computedSelectedDeliveryType.items"
                            :key="chunkItem.id"
                        >
                            <div class="product-checkout-panel__item-header">
                                <h3 class="product-checkout-panel__item-header-hl">
                                    {{ generateChunkNote(chunkItem) }}
                                </h3>
                                <v-link
                                    v-if="chunkItem.availableDates && chunkItem.availableDates.length > 1"
                                    class="product-checkout-panel__item-header-link"
                                    tag="button"
                                    @click="onChangeDate(chunkItem.id)"
                                >
                                    <v-svg name="edit" width="16" height="16" />{{ isTablet ? '' : ' Изменить дату' }}
                                </v-link>
                            </div>
                            <ul class="product-checkout-panel__item-list">
                                <checkout-product-card
                                    class="product-checkout-panel__item-card"
                                    v-for="item in chunkItem.items"
                                    :key="item.id"
                                    :name="item.name"
                                    :image="item.image"
                                />
                            </ul>
                        </li>
                    </transition-group>
                </div>
                <div key="empty" v-else class="product-checkout-panel__item-empty">
                    <h3 class="text-bold">Выберите адрес</h3>
                </div>
            </transition>
        </div>
        <div class="product-checkout-panel__item product-checkout-panel__item--payment">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Способ оплаты</h2>
            </div>
            <ul class="product-checkout-panel__item-list">
                <checkout-option-card
                    class="product-checkout-panel__item-card"
                    v-for="method in paymentMethods"
                    :key="method.id"
                    :selected="method.id === selectedPaymentMethodID"
                    readonly
                >
                    <p class="text-bold">{{ method.title }}</p>
                    <br />
                    <div class="product-checkout-panel__item-payment" v-if="method.type === 'card'">
                        <v-svg name="visa" width="40" height="24" />
                        <v-svg name="mastercard" width="40" height="24" />
                        <v-svg name="mir" width="40" height="24" />
                    </div>
                </checkout-option-card>
            </ul>

            <div
                class="product-checkout-panel__item product-checkout-panel__item--child product-checkout-panel__item--bonus"
            >
                <div class="product-checkout-panel__item-header">
                    <h3 class="product-checkout-panel__item-header-hl">
                        <v-svg name="bonus" width="24" height="24" />&nbsp;Оплата бонусами&nbsp;
                        <v-spinner width="24" height="24" :show="isBonusPending" />
                    </h3>
                </div>
                <div v-if="!bonus" class="product-checkout-panel__item-controls">
                    <template v-if="availableBonus > 0">
                        <v-input
                            type="number"
                            min="1"
                            :max="availableBonus"
                            class="product-checkout-panel__item-controls-input"
                            placeholder="Сколько бонусов использовать?"
                            v-model="bonusAmount"
                            @keydown.enter.prevent="ADD_BONUS(bonusAmount)"
                        />
                        <v-button
                            class="btn--outline product-checkout-panel__item-controls-btn"
                            @click="ADD_BONUS(bonusAmount)"
                            :disabled="!bonusAmount"
                        >
                            Применить
                        </v-button>
                    </template>
                    <span class="product-checkout-panel__item-controls-text">
                        На вашем счёте:&nbsp;
                        <strong class="text-bold">{{ availableBonus }}&nbsp;бонусов</strong>
                        <br v-show="isTablet" />
                        <span class="text-grey">(1 бонус = 1 рубль)</span>
                    </span>
                </div>
                <div v-else class="product-checkout-panel__item-card">
                    <span>
                        Будет использовано {{ bonus }} бонусных баллов&nbsp;
                        <span class="text-grey">(1 бонус = 1 рубль)</span>
                    </span>
                    <v-link class="product-checkout-panel__item-card-link" tag="button" @click="DELETE_BONUS">
                        Отменить
                    </v-link>
                </div>
            </div>
            <div
                class="product-checkout-panel__item product-checkout-panel__item--child product-checkout-panel__item--sertificate"
            >
                <div class="product-checkout-panel__item-header">
                    <h3 class="product-checkout-panel__item-header-hl">
                        <v-svg name="gift" width="24" height="24" />&nbsp;Оплата сертификатом&nbsp;
                        <v-spinner width="24" height="24" :show="isCertificatePending" />
                    </h3>
                </div>
                <ul class="product-checkout-panel__item-list">
                    <li
                        class="product-checkout-panel__item-card"
                        v-for="certificate in certificates"
                        :key="certificate.code"
                    >
                        <span>
                            Будет оплачено {{ certificate.amount }} подарочным сертификатом —
                            {{ certificate.code }}
                        </span>
                        <v-link
                            class="product-checkout-panel__item-card-link"
                            tag="button"
                            @click="DELETE_CERTIFICATE(certificate.code)"
                        >
                            Отменить
                        </v-link>
                    </li>
                </ul>
                <div class="product-checkout-panel__item-controls">
                    <v-input
                        v-model="certificateCode"
                        class="product-checkout-panel__item-controls-input"
                        placeholder="Введите номер сертификата"
                        @keydown.enter.prevent="ADD_CERTIFICATE(certificateCode)"
                    />
                    <v-button
                        class="btn--outline product-checkout-panel__item-controls-btn"
                        :disabled="!certificateCode"
                        @click="ADD_CERTIFICATE(certificateCode)"
                        @mousedown.prevent
                    >
                        Активировать
                    </v-button>
                </div>
            </div>

            <div
                class="product-checkout-panel__item product-checkout-panel__item product-checkout-panel__item--child product-checkout-panel__item--settings"
            >
                <div class="product-checkout-panel__item-panel">
                    <v-check
                        id="check-promo"
                        :checked="subscribe"
                        class="product-checkout-panel__item-panel-check"
                        name="promo"
                        @change="SET_SUBSCRIBE(Number($event))"
                    >
                        Сообщать мне об акциях, скидках и специальных предложениях
                    </v-check>
                    <v-check
                        id="check-agreement"
                        :checked="agreement"
                        class="product-checkout-panel__item-panel-check"
                        name="agreement"
                        @change="SET_AGREEMENT(Number($event))"
                    >
                        Я согласен с условиями <router-link to="/">заказа и доставки</router-link>
                    </v-check>
                </div>
                <div class="product-checkout-panel__item-panel">
                    <v-check
                        class="product-checkout-panel__item-panel-check"
                        type="radio"
                        v-for="confirmation in confirmationTypes"
                        :key="confirmation.id"
                        :id="`check-accept-${confirmation.id}`"
                        :model-value="selectedConfirmationTypeID"
                        :value="confirmation.id"
                        :name="confirmation.type"
                        @change="SET_CONFIRMATION_TYPE($event)"
                    >
                        {{ confirmation.title }}
                    </v-check>
                </div>
            </div>
        </div>

        <transition name="fade">
            <checkout-pickup-point-modal />
        </transition>

        <transition name="fade">
            <checkout-date-modal @changed="onDateChanged" />
        </transition>
    </div>
</template>
<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VLink from '../../controls/VLink/VLink.vue';
import VInput from '../../controls/VInput/VInput.vue';
import VButton from '../../controls/VButton/VButton.vue';
import VCheck from '../../controls/VCheck/VCheck.vue';
import VSpinner from '../../controls/VSpinner/VSpinner.vue';

import CheckoutDateModal from '../CheckoutDateModal/CheckoutDateModal.vue';
import CheckoutPickupPointModal from '../CheckoutPickupPointModal/CheckoutPickupPointModal.vue';
import CheckoutOptionCard from '../CheckoutOptionCard/CheckoutOptionCard.vue';
import CheckoutProductCard from '../CheckoutProductCard/CheckoutProductCard.vue';
import CheckoutAddressPanel from '../CheckoutAddressPanel/CheckoutAddressPanel.vue';

import { orderBy as _orderBy } from 'lodash/collection';
import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as CHECKOUT_MODULE, CHECKOUT_STATUS } from '../../../store/modules/Checkout';
import {
    SET_DATA_PROP,
    SET_RECIPIENT,
    SET_RECEIVE_METHOD,
    SET_ADDRESS,
    SET_DELIVERY_TYPE,
    CHANGE_CHUNK_DATE,
    ADD_BONUS,
    ADD_SERTIFICATE,
    ADD_CERTIFICATE,
    ADD_PROMOCODE,
    DELETE_BONUS,
    DELETE_CERTIFICATE,
    DELETE_PROMOCODE,
    SET_AGREEMENT,
    SET_SUBSCRIBE,
    SET_CONFIRMATION_TYPE,
} from '../../../store/modules/Checkout/actions';

import {
    RECIPIENTS,
    SELECTED_RECIPIENT,
    SELECTED_RECEIVE_METHOD_ID,
    RECEIVE_METHODS,
    ADDRESSES,
    SELECTED_ADDRESS,
    DELIVERY_TYPES,
    SELECTED_DELIVERY_TYPE,
    SELECTED_PICKUP_POINT,
    PAYMENT_METHODS,
    SELECTED_PAYMENT_METHOD_ID,
    CONFIRMATION_TYPES,
    CONFIRMATION_TYPE_ID,
    BONUS,
    CERTIFICATES,
    AGREEMENT,
    SUBSCRIBE,
    PROMO_CODE,
    SELECTED_CONFIRMATION_TYPE_ID,
    AVAILABLE_BONUS,
    ADDRESS_STATUS,
    BONUS_STATUS,
    CERTIFICATE_STATUS,
    PROMOCODE_STATUS,
    RECEIVE_METHOD_STATUS,
} from '../../../store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import {
    deliveryMethods,
    receiveTypes,
    deliveryTypes,
    receiveMethods,
    requestStatus,
} from '../../../assets/scripts/constants';

import '../../../assets/images/sprites/payment/bonus.svg';
import '../../../assets/images/sprites/payment/visa.svg';
import '../../../assets/images/sprites/payment/mastercard.svg';
import '../../../assets/images/sprites/payment/mir.svg';
import '../../../assets/images/sprites/plus.svg';
import '../../../assets/images/sprites/edit.svg';
import '../../../assets/images/sprites/gift.svg';
import './ProductCheckoutPanel.css';

function prepareChunkItem(chunkItem) {
    return {
        ...chunkItem,
        selectedDate: new Date(chunkItem.selectedDate),
        availableDates: chunkItem.availableDates.map(d => new Date(d)),
    };
}

function prepareDeliveryType(deliveryType) {
    const items = deliveryType.items;

    const type = {
        ...deliveryType,
        items: _orderBy(items.map(prepareChunkItem), ['selectedDate'], ['asc']),
    };
    return type;
}

export default {
    name: 'product-checkout-panel',
    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VCheck,
        VSpinner,

        CheckoutDateModal,
        CheckoutPickupPointModal,
        CheckoutProductCard,
        CheckoutOptionCard,
        CheckoutAddressPanel,
    },

    data() {
        return {
            bonusAmount: null,
            certificateCode: null,
        };
    },

    computed: {
        ...mapState(['locale']),
        ...mapGetters(CHECKOUT_MODULE, [
            AVAILABLE_BONUS,
            RECIPIENTS,
            SELECTED_RECIPIENT,

            RECEIVE_METHODS,
            SELECTED_RECEIVE_METHOD_ID,

            PAYMENT_METHODS,
            SELECTED_PAYMENT_METHOD_ID,

            CONFIRMATION_TYPES,
            SELECTED_CONFIRMATION_TYPE_ID,

            ADDRESSES,
            SELECTED_ADDRESS,

            SELECTED_PICKUP_POINT,

            DELIVERY_TYPES,
            SELECTED_DELIVERY_TYPE,

            BONUS,
            CERTIFICATES,
            AGREEMENT,
            SUBSCRIBE,
            PROMO_CODE,

            ADDRESS_STATUS,
            BONUS_STATUS,
            CERTIFICATE_STATUS,
            PROMOCODE_STATUS,
            RECEIVE_METHOD_STATUS,
        ]),

        computedDeliveryTypes() {
            const deliveryTypes = this[DELIVERY_TYPES];
            return deliveryTypes.map(prepareDeliveryType);
        },

        computedSelectedDeliveryType() {
            const deliveryType = this[SELECTED_DELIVERY_TYPE];
            return prepareDeliveryType(deliveryType);
        },

        isReceiveMethodPending() {
            return this[RECEIVE_METHOD_STATUS] === requestStatus.PENDING;
        },

        isAddressPending() {
            return this[ADDRESS_STATUS] === requestStatus.PENDING;
        },

        isBonusPending() {
            return this[BONUS_STATUS] === requestStatus.PENDING;
        },

        isCertificatePending() {
            return this[CERTIFICATE_STATUS] === requestStatus.PENDING;
        },

        isPromocodePending() {
            return this[PROMOCODE_STATUS] === requestStatus.PENDING;
        },

        showPanels() {
            return this.isDelivery ? this[SELECTED_ADDRESS] : this[SELECTED_PICKUP_POINT];
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isDelivery() {
            const selectedReceiveMethodID = this[SELECTED_RECEIVE_METHOD_ID];
            return (
                selectedReceiveMethodID === receiveMethods.DELIVERY ||
                selectedReceiveMethodID === receiveMethods.EXPRESS
            );
        },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [
            CHANGE_CHUNK_DATE,
            SET_RECIPIENT,
            SET_RECEIVE_METHOD,
            SET_ADDRESS,
            SET_DELIVERY_TYPE,
            SET_AGREEMENT,
            SET_SUBSCRIBE,
            SET_CONFIRMATION_TYPE,

            ADD_BONUS,
            DELETE_BONUS,

            ADD_CERTIFICATE,
            DELETE_CERTIFICATE,

            ADD_PROMOCODE,
            DELETE_PROMOCODE,
        ]),

        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        generateChunkNote(chunkItem) {
            const options = { month: 'long', day: 'numeric' };
            const date = new Date(chunkItem.selectedDate);
            return date.toLocaleDateString(this.locale, options);
        },

        generatePackageNote(deliveryType) {
            const options = { month: 'long', day: 'numeric' };

            if (deliveryType.typeID === deliveryTypes.CONSOLIDATION) {
                const date = new Date(deliveryType.items[0].selectedDate);
                return `Доставим всё ${date.toLocaleDateString(this.locale, options)}`;
            }

            const note = 'Доставим';
            const uniqueDates = Array.from(new Set(deliveryType.items.map(i => i.selectedDate)));
            return uniqueDates.reduce(
                (accum, current, index) =>
                    accum + `${index > 0 ? ', ' : ' '}${new Date(current).toLocaleDateString(this.locale, options)}`,
                'Доставим'
            );
        },

        onSetDeliveryType(id) {
            const selectedType = this[DELIVERY_TYPES] && this[DELIVERY_TYPES].find(t => t.id === id);
            this[SET_DELIVERY_TYPE](selectedType);
        },

        onDateChanged(state) {
            this[CHANGE_CHUNK_DATE]({ id: state.id, selectedDate: state.selectedDate[0] });
        },

        onChangeDate(chunkItemId) {
            const deliveryType = this[SELECTED_DELIVERY_TYPE];
            const chunkItem = deliveryType.items.find(i => i.id === chunkItemId);

            const state = {
                id: chunkItem.id,
                selectedDate: [chunkItem.selectedDate],
                availableDates: [...chunkItem.availableDates],
            };

            this[CHANGE_MODAL_STATE]({
                name: 'checkout-date-modal',
                open: true,
                state,
            });
        },

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
