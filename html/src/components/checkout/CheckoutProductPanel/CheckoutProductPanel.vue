<template>
    <div class="checkout-product-panel">
        <template v-if="canDeliver">
            <div class="checkout-product-panel__item checkout-product-panel__item--recipient">
                <div class="checkout-product-panel__item-header">
                    <h2 class="checkout-product-panel__item-header-hl">Получатель</h2>
                </div>

                <ul class="checkout-product-panel__item-list">
                    <checkout-option-card
                        class="checkout-product-panel__item-card"
                        v-for="(recipient, index) in recipients"
                        :key="recipient.id"
                        :selected="selectedRecipient && isEqualObject(recipient, selectedRecipient)"
                        :show-check="recipients.length > 1"
                        @cardClick="onSetRecipient(recipient)"
                        @btnClick="onChangeRecipient(recipient, index)"
                    >
                        <p>{{ recipient.name }}</p>
                        <p>{{ formatPhoneNumber(recipient.phone) }}</p>
                        <p>{{ recipient.email }}</p>
                    </checkout-option-card>
                </ul>

                <v-link class="checkout-product-panel__item-header-link" tag="button" @click="onAddRecipient">
                    <v-svg name="plus" width="24" height="24" />&nbsp;Добавить нового получателя
                </v-link>
            </div>

            <div class="checkout-product-panel__item checkout-product-panel__item--receive-method">
                <div class="checkout-product-panel__item-header">
                    <h2 class="checkout-product-panel__item-header-hl">
                        Способ получения&nbsp;<v-spinner width="24" height="24" :show="isReceiveMethodPending" />
                    </h2>
                </div>

                <ul class="checkout-product-panel__item-list">
                    <checkout-option-card
                        class="checkout-product-panel__item-card"
                        v-for="method in receiveMethods"
                        :key="method.id"
                        :selected="method.id === selectedReceiveMethodID"
                        readonly
                        @cardClick="onSetReceiveMethod(method)"
                    >
                        <p class="text-bold">{{ method.title }}</p>
                        <p>
                            <price v-bind="method.price" />&nbsp;
                            <price v-if="method.cost" class="text-grey text-sm text-strike" v-bind="method.cost" />
                        </p>
                        <p class="text-grey text-sm">{{ method.description }}</p>
                    </checkout-option-card>
                </ul>
            </div>

            <div class="checkout-product-panel__item">
                <div
                    class="checkout-product-panel__item-header"
                    :class="{ 'checkout-product-panel__item-header--error': addressError }"
                    ref="address"
                >
                    <h2 class="checkout-product-panel__item-header-hl">
                        {{ isDelivery ? 'Адрес доставки' : 'Пункт самовывоза' }}&nbsp;
                        <v-spinner width="24" height="24" :show="isAddressPending" />
                    </h2>
                </div>

                <transition name="fade-in">
                    <checkout-address-panel v-if="isDelivery" @change-address="onChangeAddress" />
                    <checkout-pickup-point-panel v-else @change-address="onChangePickupPoint" />
                </transition>

                <v-link
                    v-if="isDelivery"
                    class="checkout-product-panel__item-header-link"
                    tag="button"
                    @click="onAddAddress"
                >
                    <v-svg name="plus" width="24" height="24" />&nbsp;Добавить новый адрес
                </v-link>

                <v-link
                    v-else-if="selectedPickupPoint"
                    class="checkout-product-panel__item-header-link"
                    tag="button"
                    @click="onChangePickupPoint"
                >
                    <v-svg name="pin" width="16" height="16" />&nbsp;&nbsp;Выбрать другой
                </v-link>
            </div>

            <div class="checkout-product-panel__item checkout-product-panel__item--delivery">
                <div class="checkout-product-panel__item-header" ref="date">
                    <h2 class="checkout-product-panel__item-header-hl">Дата и время доставки</h2>
                </div>

                <transition name="fade-in" mode="out-in">
                    <div key="not-empty" v-if="showPanels">
                        <ul
                            class="checkout-product-panel__item-list"
                            v-if="computedDeliveryTypes && computedDeliveryTypes.length > 1"
                        >
                            <checkout-option-card
                                class="checkout-product-panel__item-card"
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
                                class="checkout-product-panel__item checkout-product-panel__item--child"
                                v-for="chunkItem in computedSelectedDeliveryType.items"
                                :key="chunkItem.id"
                            >
                                <div class="checkout-product-panel__item-header">
                                    <h3 class="checkout-product-panel__item-header-hl">
                                        {{ generateChunkNote(chunkItem) }}
                                    </h3>

                                    <v-link
                                        v-if="
                                            chunkItem.availableDateTimes &&
                                            Object.keys(chunkItem.availableDateTimes).length > 1
                                        "
                                        class="checkout-product-panel__item-header-link"
                                        tag="button"
                                        @click="onChangeDate(chunkItem.id)"
                                    >
                                        <v-svg name="edit" width="16" height="16" />
                                        <template v-if="!isTablet">
                                            &nbsp;&nbsp;Изменить дату и время
                                        </template>
                                    </v-link>
                                </div>
                                <ul class="checkout-product-panel__item-list">
                                    <checkout-product-card
                                        class="checkout-product-panel__item-card"
                                        v-for="item in chunkItem.items"
                                        :key="item.id"
                                        :name="item.name"
                                        :image="item.image"
                                        :href="generateItemProductUrl(item)"
                                    />
                                </ul>
                            </li>
                        </transition-group>
                    </div>

                    <div key="empty" v-else class="checkout-product-panel__item-empty">
                        <h3 class="text-bold">Выберите адрес</h3>
                    </div>
                </transition>
            </div>
            <div class="checkout-product-panel__item checkout-product-panel__item--payment">
                <div class="checkout-product-panel__item-header">
                    <h2 class="checkout-product-panel__item-header-hl">Способ оплаты</h2>
                </div>

                <ul class="checkout-product-panel__item-list">
                    <checkout-option-card
                        class="checkout-product-panel__item-card"
                        v-for="method in paymentMethods"
                        :key="method.id"
                        :selected="method.id === selectedPaymentMethodID"
                        readonly
                    >
                        <div class="checkout-product-panel__item-payment" v-if="method.type === 'card'">
                            <div class="text-bold checkout-product-panel__item-payment-title">
                                {{ method.title }}
                            </div>
                            <div class="checkout-product-panel__item-payment-list">
                                <div class="checkout-master-class-panel__item-payment-list-item">
                                    <v-svg name="visa" width="40" height="24" />
                                </div>
                                <div class="checkout-master-class-panel__item-payment-list-item">
                                    <v-svg name="mastercard" width="40" height="24" />
                                </div>
                                <div class="checkout-master-class-panel__item-payment-list-item">
                                    <v-svg name="mir" width="40" height="24" />
                                </div>
                                <div class="checkout-master-class-panel__item-payment-list-item">
                                    <v-svg name="apple" width="40" height="24" />
                                </div>
                                <div class="checkout-master-class-panel__item-payment-list-item">
                                    <v-svg name="google" width="40" height="24" />
                                </div>
                                <div class="checkout-master-class-panel__item-payment-list-item">
                                    <v-svg name="yandex" width="56" height="24" />
                                </div>
                            </div>
                        </div>
                        <p class="text-bold" v-else>{{ method.title }}</p>
                    </checkout-option-card>
                </ul>

                <div
                    v-if="(referralPartner && availableBonus > 0) || (!referralPartner && maxAmountBonus)"
                    class="checkout-product-panel__item checkout-product-panel__item--child checkout-product-panel__item--bonus"
                >
                    <div class="checkout-product-panel__item-header">
                        <h3 class="checkout-product-panel__item-header-hl">
                            <v-svg name="bonus" width="24" height="24" />&nbsp;Оплата бонусами&nbsp;
                            <span v-if="!isTablet" class="text-sm text-normal text-grey">
                                (1 бонус = {{ bonusPerRub }} рубль)
                            </span>
                            <v-spinner width="24" height="24" :show="isBonusPending" />
                        </h3>
                    </div>
                    <div v-if="!bonus" class="checkout-product-panel__item-controls">
                        <template v-if="availableBonus > 0">
                            <v-input
                                type="number"
                                min="1"
                                :max="availableBonus"
                                class="checkout-product-panel__item-controls-input"
                                placeholder="Сколько бонусов использовать?"
                                v-model="bonusAmount"
                                @keydown.enter.prevent="ADD_BONUS(bonusAmount)"
                            />
                            <v-button
                                class="btn--outline checkout-product-panel__item-controls-btn"
                                @click="ADD_BONUS(bonusAmount)"
                                :disabled="!bonusAmount"
                            >
                                Применить
                            </v-button>
                        </template>
                        <span class="checkout-product-panel__item-controls-text">
                            Доступно для оплаты:&nbsp;
                            <strong class="text-bold">{{ maxAmountBonus }}</strong
                            >&nbsp;из&nbsp;{{ availableBonus }} бонусов
                        </span>
                    </div>
                    <div v-else class="checkout-product-panel__item-card checkout-product-panel__item-card--bonus">
                        <span>
                            Будет использовано <strong class="text-bold">{{ bonus }}</strong
                            >&nbsp;из&nbsp;{{ availableBonus }} бонусных баллов&nbsp;
                        </span>
                        <div class="checkout-product-panel__item-card-panel">
                            <div v-if="isTablet" class="text-sm text-normal text-grey">
                                (1 бонус = {{ bonusPerRub }} рубль)
                            </div>
                            <v-link class="checkout-product-panel__item-card-link" tag="button" @click="DELETE_BONUS">
                                Изменить
                            </v-link>
                        </div>
                    </div>
                </div>

                <!-- <div
                    class="checkout-product-panel__item checkout-product-panel__item--child checkout-product-panel__item--sertificate"
                >
                    <div class="checkout-product-panel__item-header">
                        <h3 class="checkout-product-panel__item-header-hl">
                            <v-svg name="gift" width="24" height="24" />&nbsp;Оплата сертификатом&nbsp;
                            <v-spinner width="24" height="24" :show="isCertificatePending" />
                        </h3>
                    </div>
                    <ul class="checkout-product-panel__item-list">
                        <li
                            class="checkout-product-panel__item-card"
                            v-for="certificate in certificates"
                            :key="certificate.code"
                        >
                            <span>
                                Будет оплачено {{ certificate.amount }} подарочным сертификатом —
                                {{ certificate.code }}
                            </span>
                            <v-link
                                class="checkout-product-panel__item-card-link"
                                tag="button"
                                @click="DELETE_CERTIFICATE(certificate.code)"
                            >
                                Отменить
                            </v-link>
                        </li>
                    </ul>
                    <div class="checkout-product-panel__item-controls">
                        <v-input
                            v-model="certificateCode"
                            class="checkout-product-panel__item-controls-input"
                            placeholder="Введите номер сертификата"
                            @keydown.enter.prevent="ADD_CERTIFICATE(certificateCode)"
                        />
                        <v-button
                            class="btn--outline checkout-product-panel__item-controls-btn"
                            :disabled="!certificateCode"
                            @click="ADD_CERTIFICATE(certificateCode)"
                            @mousedown.prevent
                        >
                            Активировать
                        </v-button>
                    </div>
                </div> -->

                <div
                    class="checkout-product-panel__item checkout-product-panel__item checkout-product-panel__item--child checkout-product-panel__item--settings"
                >
                    <div class="checkout-product-panel__item-panel" ref="agreement">
                        <!-- #58436 -->
                        <!-- <v-check
                            id="check-promo"
                            :checked="subscribe"
                            class="checkout-product-panel__item-panel-check"
                            name="promo"
                            @change="SET_SUBSCRIBE(Number($event))"
                            >
                            Сообщать мне об акциях, скидках и специальных предложениях
                        </v-check> -->
                        <v-check
                            id="check-agreement"
                            :checked="agreement"
                            class="checkout-product-panel__item-panel-check"
                            name="agreement"
                            @change="onSetAgreement($event)"
                        >
                            Я согласен с
                            <router-link
                                :to="{ name: 'Agreements', params: { type: agreementTypes.PUBLIC_OFFER } }"
                                target="_blank"
                            >
                                условиями оферты
                            </router-link>
                            и
                            <router-link
                                :to="{ name: 'Agreements', params: { type: agreementTypes.PERSONAL_POLICY } }"
                                target="_blank"
                            >
                                политикой конфиденциальности
                            </router-link>
                        </v-check>
                        <transition name="slide-in-bottom" mode="out-in">
                            <div class="status-color-error" :key="agreementError" v-if="agreementError">
                                {{ agreementError }}
                            </div>
                        </transition>
                    </div>

                    <div class="checkout-product-panel__item-panel">
                        <v-check
                            class="checkout-product-panel__item-panel-check"
                            type="radio"
                            v-for="confirmation in confirmationTypes"
                            :key="confirmation.id"
                            :id="`check-accept-${confirmation.id}`"
                            :model-value="selectedConfirmationTypeID"
                            :value="confirmation.id"
                            :name="confirmation.type"
                            @change="onSetConfirmationType"
                        >
                            {{ confirmation.title }}
                        </v-check>
                    </div>
                </div>
            </div>
        </template>
        <attention-panel class="checkout-product-panel__attention" v-else>
            К сожалению, по данным параметрам заказа доставка не может быть реализована. <br />
            Возможно, доставка в ваш регион не осуществляется. <br />Пожалуйста, выберете другой регион для доставки или
            проверьте параметры Вашего заказа.
        </attention-panel>

        <transition name="fade">
            <checkout-pickup-point-modal v-if="isPickupPointModalOpen" />
        </transition>

        <transition name="fade">
            <checkout-date-modal v-if="isDateModalOpen" @changed="onDateChanged" />
        </transition>

        <transition name="fade">
            <checkout-recipient-modal
                v-if="$isServer || isRecipientModalOpen"
                @save="onSaveRecipient"
                @close="onCloseRecipientModal"
            />
        </transition>

        <transition name="fade">
            <address-edit-modal
                v-if="$isServer || isAddressModalOpen"
                @save="onSaveAddress"
                @close="onCloseAddressModal"
            />
        </transition>
    </div>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import Price from '@components/Price/Price.vue';
import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';
import CheckoutProductCard from '@components/checkout/CheckoutProductCard/CheckoutProductCard.vue';
import CheckoutDateModal from '@components/checkout/CheckoutDateModal/CheckoutDateModal.vue';
import CheckoutPickupPointModal from '@components/checkout/CheckoutPickupPointModal/CheckoutPickupPointModal.vue';
import CheckoutPickupPointPanel from '@components/checkout/CheckoutPickupPointPanel/CheckoutPickupPointPanel.vue';
import CheckoutAddressPanel from '@components/checkout/CheckoutAddressPanel/CheckoutAddressPanel.vue';

import CheckoutRecipientModal from '@components/checkout/CheckoutRecipientModal/CheckoutRecipientModal.vue';
import AddressEditModal from '@components/profile/AddressEditModal/AddressEditModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { LOCALE } from '@store';

import { NAME as AUTH_MODULE, HAS_SESSION, REFERRAL_PARTNER, USER } from '@store/modules/Auth';

import { NAME as CHECKOUT_MODULE, CHECKOUT_STATUS } from '@store/modules/Checkout';
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
    ADD_ADDRESS,
    CHANGE_ADDRESS,
    ADD_RECIPIENT,
    CHANGE_RECIPIENT,
} from '@store/modules/Checkout/actions';

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
    BONUS_PER_RUB,
    AVAILABLE_BONUS,
    MAX_BONUS,
    ADDRESS_STATUS,
    BONUS_STATUS,
    CERTIFICATE_STATUS,
    PROMOCODE_STATUS,
    RECEIVE_METHOD_STATUS,
} from '@store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import validationMixin, { required } from '@plugins/validation';
import { formatPhoneNumber, getPosition } from '@util';
import { deliveryMethods, receiveTypes, deliveryTypes, receiveMethods } from '@enums/checkout';
import { requestStatus, modalName, weekDays, agreementTypes } from '@enums';
import { SCROLL_DEBOUNCE_TIME } from '@constants';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import _debounce from 'lodash/debounce';
import { orderBy as _orderBy } from 'lodash/collection';

import { generateProductUrl } from '@util/catalog';

import '@images/sprites/payment/bonus.svg';
import '@images/sprites/payment/visa.svg';
import '@images/sprites/payment/mastercard.svg';
import '@images/sprites/payment/mir.svg';
import '@images/sprites/payment/apple.svg';
import '@images/sprites/payment/google.svg';
import '@images/sprites/payment/yandex.svg';
import '@images/sprites/plus.svg';
import '@images/sprites/edit.svg';
import '@images/sprites/gift.svg';
import './CheckoutProductPanel.css';

function prepareChunkItem(chunkItem) {
    const selectedDate = chunkItem.selectedDate ? new Date(chunkItem.selectedDate) : null;
    const selectedTime = !chunkItem.deliveryTimeStart
        ? chunkItem.availableDateTimes &&
          chunkItem.selectedDate &&
          chunkItem.availableDateTimes[chunkItem.selectedDate] &&
          chunkItem.availableDateTimes[chunkItem.selectedDate][0]
        : null;
    let time = {};

    if (selectedTime) {
        time = {
            deliveryTimeStart: selectedTime.from,
            deliveryTimeEnd: selectedTime.to,
            deliveryTimeCode: selectedTime.code,
        };
    }

    return {
        ...chunkItem,
        ...time,
        selectedDate,
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
    name: 'checkout-product-panel',
    mixins: [validationMixin],

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VCheck,
        VSpinner,

        Price,
        AttentionPanel,

        CheckoutProductCard,
        CheckoutOptionCard,
        CheckoutAddressPanel,
        CheckoutPickupPointPanel,
        CheckoutDateModal,
        CheckoutRecipientModal,
        CheckoutPickupPointModal,

        AddressEditModal,
    },

    validations() {
        const selectedId = this[SELECTED_RECEIVE_METHOD_ID];
        switch (selectedId) {
            case receiveMethods.PICKUP:
                return {
                    [AGREEMENT]: {
                        valid: value => value === true,
                    },

                    [SELECTED_RECIPIENT]: {
                        required,
                    },

                    [SELECTED_PICKUP_POINT]: {
                        required,
                    },
                };

            case receiveMethods.DELIVERY:
            case receiveMethods.EXPRESS:
            default:
                return {
                    [AGREEMENT]: {
                        valid: value => value === true,
                    },

                    [SELECTED_RECIPIENT]: {
                        required,
                    },

                    [SELECTED_ADDRESS]: {
                        required,
                    },
                };
        }
    },

    data() {
        return {
            bonusAmount: null,
            certificateCode: null,
            recipientIndexToChange: null,
            addressIndexToChange: null,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: state => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
        }),
        ...mapState(MODAL_MODULE, {
            isPickupPointModalOpen: state =>
                state[MODALS][CheckoutPickupPointModal.name] && state[MODALS][CheckoutPickupPointModal.name].open,
            isDateModalOpen: state =>
                state[MODALS][CheckoutDateModal.name] && state[MODALS][CheckoutDateModal.name].open,
            isAddressModalOpen: state =>
                state[MODALS][modalName.profile.ADDRESS_EDIT] && state[MODALS][modalName.profile.ADDRESS_EDIT].open,
            isRecipientModalOpen: state =>
                state[MODALS][modalName.checkout.RECIPIENT_EDIT] &&
                state[MODALS][modalName.checkout.RECIPIENT_EDIT].open,
        }),

        ...mapGetters(CHECKOUT_MODULE, [
            BONUS_PER_RUB,
            AVAILABLE_BONUS,
            MAX_BONUS,
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

        canDeliver() {
            const receiveMethods = this[RECEIVE_METHODS];
            return receiveMethods && receiveMethods.length > 0;
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

        agreementError() {
            if (this.$v.agreement.$dirty && !this.$v.agreement.valid) {
                this.debounce_scrollToError(this.$refs.agreement);
                return 'Подтвердите согласие с условиями заказа и доставки';
            }
        },

        addressError() {
            const selectedId = this[SELECTED_RECEIVE_METHOD_ID];
            switch (selectedId) {
                case receiveMethods.PICKUP:
                    if (this.$v.selectedPickupPoint.$dirty && !this.$v.selectedPickupPoint.required) {
                        this.debounce_scrollToError(this.$refs.address);
                        return 'Укажите пункт самовывоза';
                    }
                    break;

                case receiveMethods.DELIVERY:
                case receiveMethods.EXPRESS:
                default:
                    if (this.$v.selectedAddress.$dirty && !this.$v.selectedAddress.required) {
                        this.debounce_scrollToError(this.$refs.address);
                        return 'Укажите адрес доставки';
                    }
                    break;
            }
        },

        maxAmountBonus() {
            return this[MAX_BONUS] < this[AVAILABLE_BONUS] ? this[MAX_BONUS] : this[AVAILABLE_BONUS];
        },
    },

    watch: {
        computedDeliveryTypes(value) {
            const deliveryType = this[SELECTED_DELIVERY_TYPE];
            if (value) {
                value.forEach(el => {
                    if (el) {
                        if (el.items)
                            el.items.forEach(delivery => {
                                if (deliveryType) {
                                    this[CHANGE_CHUNK_DATE]({
                                        ...delivery,
                                    });
                                }
                            });
                    }
                });
            }
        },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [
            CHANGE_CHUNK_DATE,
            SET_RECEIVE_METHOD,

            SET_DELIVERY_TYPE,
            SET_AGREEMENT,
            SET_SUBSCRIBE,
            SET_CONFIRMATION_TYPE,

            SET_ADDRESS,
            ADD_ADDRESS,
            CHANGE_ADDRESS,

            ADD_BONUS,
            DELETE_BONUS,

            ADD_CERTIFICATE,
            DELETE_CERTIFICATE,

            ADD_PROMOCODE,
            DELETE_PROMOCODE,

            SET_RECIPIENT,
            ADD_RECIPIENT,
            CHANGE_RECIPIENT,
        ]),

        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        validate() {
            this.$v.$touch();
            return !this.$v.$invalid;
        },

        formatPhoneNumber(phone) {
            return formatPhoneNumber(phone);
        },

        generateChunkNote(chunkItem) {
            const options = { month: 'long', day: 'numeric' };
            const date = new Date(chunkItem.selectedDate);
            const today = new Date().getDate();
            let additionalText = ``;
            if (chunkItem.selectedDate) {
                if (today === date.getDate()) additionalText = `сегодня`;
                else if (today + 1 === date.getDate()) additionalText = `завтра`;
                else additionalText = this.$t(`weekdays.long.${date.getDay()}`);
                const timeString =
                    chunkItem.deliveryTimeStart && chunkItem.deliveryTimeEnd
                        ? `, с ${chunkItem.deliveryTimeStart}:00 до ${chunkItem.deliveryTimeEnd}:00`
                        : '';
                return `${date.toLocaleDateString(this[LOCALE], options)}, ${additionalText}${timeString}`;
            }
            return 'Для данного адреса сейчас нет доступных дат доставки';
        },

        generatePackageNote(deliveryType) {
            const options = { month: 'long', day: 'numeric' };

            if (deliveryType.typeID === deliveryTypes.CONSOLIDATION) {
                const date = new Date(deliveryType.items[0].selectedDate);
                return `Доставим всё ${date.toLocaleDateString(this[LOCALE], options)}`;
            }

            const note = 'Доставим';
            const uniqueDates = Array.from(new Set(deliveryType.items.map(i => i.selectedDate)));
            return uniqueDates.reduce(
                (accum, current, index) =>
                    accum + `${index > 0 ? ', ' : ' '}${new Date(current).toLocaleDateString(this[LOCALE], options)}`,
                'Доставим'
            );
        },

        onSetConfirmationType(value) {
            this[SET_CONFIRMATION_TYPE](value);
        },

        onSetReceiveMethod(method) {
            this[SET_RECEIVE_METHOD](method);
        },

        onSetAgreement(value) {
            this[SET_AGREEMENT](Number(value));
        },

        onSetDeliveryType(id) {
            const selectedType = this[DELIVERY_TYPES] && this[DELIVERY_TYPES].find(t => t.id === id);
            this[SET_DELIVERY_TYPE](selectedType);
        },

        onDateChanged(state) {
            this[CHANGE_CHUNK_DATE]({
                id: state.id,
                selectedDate: state.selectedDate[0],
                deliveryTimeStart: state.deliveryTimeStart,
                deliveryTimeEnd: state.deliveryTimeEnd,
                deliveryTimeCode: state.deliveryTimeCode,
            });
        },

        onChangeDate(chunkItemId) {
            const deliveryType = this[SELECTED_DELIVERY_TYPE];
            const chunkItem = deliveryType.items.find(i => i.id === chunkItemId);

            const state = {
                id: chunkItem.id,
                selectedDate: [chunkItem.selectedDate],
                deliveryTimeStart: chunkItem.deliveryTimeStart,
                deliveryTimeEnd: chunkItem.deliveryTimeEnd,
                deliveryTimeCode: chunkItem.deliveryTimeCode,
                availableDateTimes: { ...chunkItem.availableDateTimes },
            };

            this[CHANGE_MODAL_STATE]({
                name: CheckoutDateModal.name,
                open: true,
                state,
            });
        },

        isEqualObject(obj1, obj2) {
            return _isEqual(obj1, obj2);
        },

        onSetRecipient(recipient) {
            this[SET_RECIPIENT](recipient);
        },

        onChangeRecipient(recipient, index) {
            this.recipientIndexToChange = index;
            this[CHANGE_MODAL_STATE]({
                name: modalName.checkout.RECIPIENT_EDIT,
                open: true,
                state: { recipient: { ...recipient } },
            });
        },

        onAddRecipient() {
            this[CHANGE_MODAL_STATE]({ name: modalName.checkout.RECIPIENT_EDIT, open: true, state: { recipient: {} } });
        },

        onSaveRecipient(recipient) {
            if (this.recipientIndexToChange !== null)
                this[CHANGE_RECIPIENT]({ index: this.recipientIndexToChange, recipient });
            else this[ADD_RECIPIENT](recipient);
        },

        onCloseRecipientModal() {
            this.recipientIndexToChange = null;
        },

        onChangeAddress({ address, index }) {
            this.addressIndexToChange = index;
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.ADDRESS_EDIT,
                open: true,
                state: { address: { ...address } },
            });
        },

        onAddAddress() {
            this[CHANGE_MODAL_STATE]({ name: modalName.profile.ADDRESS_EDIT, open: true, state: { address: {} } });
        },

        onSaveAddress(address) {
            if (this.addressIndexToChange !== null) this[CHANGE_ADDRESS]({ index: this.addressIndexToChange, address });
            else this[ADD_ADDRESS](address);
        },

        onCloseAddressModal() {
            this.addressIndexToChange = null;
        },

        onChangePickupPoint() {
            this[CHANGE_MODAL_STATE]({ name: CheckoutPickupPointModal.name, open: true });
        },

        scrollToError(element) {
            const panelScrollOffset = 24;
            window.scrollTo({ top: getPosition(element).y - panelScrollOffset, behavior: 'smooth' });
        },

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },
    },

    created() {
        this.agreementTypes = agreementTypes;
    },

    mounted() {
        this.debounce_scrollToError = _debounce(this.scrollToError, SCROLL_DEBOUNCE_TIME);
    },
};
</script>
