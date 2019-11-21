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
                    <v-svg name="pin" width="16" height="16" />&nbsp;&nbsp;Выбрать другой
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

        <div class="product-checkout-panel__item product-checkout-panel__item--delivery">
            <div class="product-checkout-panel__item-header">
                <h2 class="product-checkout-panel__item-header-hl">Дата и время доставки</h2>
            </div>
            <transition name="fade-in" mode="out-in">
                <div key="not-empty" v-if="showPanels">
                    <ul class="product-checkout-panel__item-list" v-if="packages && packages.length > 1">
                        <checkout-option-card
                            class="product-checkout-panel__item-card"
                            v-for="packageItem in packages"
                            :key="`package-item-${packageItem.typeID}-${packageItem.methodID}`"
                            :selected="selectedPackage && selectedPackage.id === packageItem.id"
                            readonly
                            @cardClick="SET_SELECTED_PACKAGE(packageItem)"
                        >
                            <p class="text-bold">{{ deliveryTypesMap[packageItem.typeID].title }}</p>
                            <p>{{ deliveryTypesMap[packageItem.typeID].description }}</p>
                            <p class="text-grey text-sm">{{ generatePackageNote(packageItem) }}</p>
                        </checkout-option-card>
                    </ul>
                    <transition-group tag="ul" name="fade-in">
                        <li
                            class="product-checkout-panel__item product-checkout-panel__item--child"
                            v-for="chunkItem in selectedPackage.items"
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
                                    @click="
                                        onChangeDate({
                                            id: chunkItem.id,
                                            selectedDate: [chunkItem.selectedDate],
                                            availableDates: [...chunkItem.availableDates],
                                        })
                                    "
                                >
                                    <v-svg name="edit" width="16" height="16" />&nbsp;Изменить дату
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
                    <h3 class="text-bold">Выберите пункт выдачи заказов</h3>
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
                    :selected="checkoutData.paymentMethodID === method.id"
                    readonly
                    @cardClick="SET_DATA_PROP({ prop: 'paymentMethodID', value: method.id })"
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
                        <v-svg name="bonus" width="24" height="24" />&nbsp;Оплата бонусами
                    </h3>
                </div>
                <div v-if="bonuses.length === 0" class="product-checkout-panel__item-controls">
                    <v-input
                        type="number"
                        min="1"
                        max="300"
                        class="product-checkout-panel__item-controls-input"
                        placeholder="Сколько бонусов использовать?"
                        v-model="bonusAmount"
                    />
                    <v-button
                        class="btn--outline product-checkout-panel__item-controls-btn"
                        @click="ADD_BONUS(bonusAmount)"
                        :disabled="!bonusAmount"
                    >
                        Применить
                    </v-button>
                    <span>
                        На вашем счёте:&nbsp;
                        <strong class="text-bold">{{ 300 }}&nbsp;бонусов</strong>
                        &nbsp;<span class="text-grey">(1 бонус = 1 рубль)</span>
                    </span>
                </div>
                <div v-else class="product-checkout-panel__item-card" v-for="bonus in bonuses" :key="bonus.id">
                    <span>
                        Будет использовано {{ bonus.amount }} бонусных баллов&nbsp;
                        <span class="text-grey">(1 бонус = 1 рубль)</span>
                    </span>
                    <v-link class="product-checkout-panel__item-card-link" tag="button" @click="DELETE_BONUS(bonus)">
                        Отменить
                    </v-link>
                </div>
            </div>
            <div
                class="product-checkout-panel__item product-checkout-panel__item--child product-checkout-panel__item--sertificate"
            >
                <div class="product-checkout-panel__item-header">
                    <h3 class="product-checkout-panel__item-header-hl">
                        <v-svg name="bonus" width="24" height="24" />&nbsp;Оплата сертификатом
                    </h3>
                </div>
                <ul class="product-checkout-panel__item-list">
                    <li
                        class="product-checkout-panel__item-card"
                        v-for="sertificate in sertificates"
                        :key="sertificate.code"
                    >
                        <span>
                            Будет оплачено {{ sertificate.amount }} подарочным сертификатом —
                            {{ sertificate.code }}
                        </span>
                        <v-link
                            class="product-checkout-panel__item-card-link"
                            tag="button"
                            @click="DELETE_SERTIFICATE(sertificate)"
                        >
                            Отменить
                        </v-link>
                    </li>
                </ul>
                <div class="product-checkout-panel__item-controls">
                    <v-input
                        v-model="sertificateCode"
                        class="product-checkout-panel__item-controls-input"
                        placeholder="Введите номер сертификата"
                    />
                    <v-button
                        class="btn--outline product-checkout-panel__item-controls-btn"
                        @click="ADD_SERTIFICATE(sertificateCode)"
                        :disabled="!sertificateCode"
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
                        @change="SET_DATA_PROP({ prop: 'subscribe', value: Number($event) })"
                    >
                        Сообщать мне об акциях, скидках и специальных предложениях
                    </v-check>
                    <v-check
                        id="check-agreement"
                        :checked="agreement"
                        class="product-checkout-panel__item-panel-check"
                        name="agreement"
                        @change="SET_DATA_PROP({ prop: 'agreement', value: Number($event) })"
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
                        :model-value="confirmationTypeID"
                        :value="confirmation.id"
                        :name="confirmation.type"
                        @change="SET_DATA_PROP({ prop: 'confirmationTypeID', value: $event })"
                    >
                        {{ confirmation.title }}
                    </v-check>
                </div>
            </div>
        </div>

        <transition name="modal">
            <checkout-pickup-point-modal />
        </transition>

        <transition name="modal">
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

import CheckoutDateModal from '../CheckoutDateModal/CheckoutDateModal.vue';
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
    PAYMENT_METHODS,
    CONFIRMATION_TYPES,
    SELECTED_PACKAGE,
} from '../../../store/modules/Checkout';

import {
    SET_DATA_PROP,
    SET_RECEIVE_METHOD,
    SET_SELECTED_PICKUP_POINT,
    SET_SELECTED_ADDRESS,
    SET_SELECTED_PACKAGE,
    ADD_BONUS,
    DELETE_BONUS,
    ADD_SERTIFICATE,
    DELETE_SERTIFICATE,
    CHANGE_PACKAGE_DATE,
} from '../../../store/modules/Checkout/actions';

import {
    SERTIFICATES,
    SUBSCRIBE,
    AGREEMENT,
    BONUSES,
    CONFIRMATION_TYPE_ID,
    DELIVERY_TYPES_MAP,
} from '../../../store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { deliveryMethods, receiveTypes, deliveryTypes } from '../../../assets/scripts/constants';

import '../../../assets/images/sprites/payment/bonus.svg';
import '../../../assets/images/sprites/payment/visa.svg';
import '../../../assets/images/sprites/payment/mastercard.svg';
import '../../../assets/images/sprites/payment/mir.svg';
import '../../../assets/images/sprites/plus.svg';
import '../../../assets/images/sprites/edit.svg';
import './ProductCheckoutPanel.css';

export default {
    name: 'product-checkout-panel',
    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VCheck,

        CheckoutDateModal,
        CheckoutPickupPointModal,
        CheckoutProductCard,
        CheckoutOptionCard,
        CheckoutAddressPanel,
    },

    data() {
        return {
            bonusAmount: null,
            sertificateCode: null,
        };
    },

    computed: {
        ...mapState(['locale']),
        ...mapState(CHECKOUT_MODULE, [
            CHECKOUT_DATA,
            RECEIVE_METHODS,
            DELIVERY_TYPES,
            PAYMENT_METHODS,
            CONFIRMATION_TYPES,

            SELECTED_ADDRESS,
            ADDRESSES,

            SELECTED_PICKUP_POINT,
            PICKUP_POINTS,

            SELECTED_PACKAGE,
            PACKAGES,
        ]),

        ...mapGetters(CHECKOUT_MODULE, [
            SERTIFICATES,
            BONUSES,
            SUBSCRIBE,
            AGREEMENT,
            CONFIRMATION_TYPE_ID,
            DELIVERY_TYPES_MAP,
        ]),

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
            SET_DATA_PROP,
            SET_SELECTED_PICKUP_POINT,
            SET_SELECTED_ADDRESS,
            SET_RECEIVE_METHOD,
            SET_SELECTED_PACKAGE,

            ADD_BONUS,
            DELETE_BONUS,

            ADD_SERTIFICATE,
            DELETE_SERTIFICATE,

            CHANGE_PACKAGE_DATE,
        ]),

        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        generateChunkNote(chunkItem) {
            const options = { month: 'long', day: 'numeric' };
            const date = new Date(chunkItem.selectedDate);
            return date.toLocaleDateString(this.locale, options);
        },

        generatePackageNote(packageItem) {
            const options = { month: 'long', day: 'numeric' };

            if (packageItem.typeID === deliveryTypes.CONSOLIDATION) {
                const date = new Date(packageItem.items[0].selectedDate);
                return `Доставим всё ${date.toLocaleDateString(this.locale, options)}`;
            }

            const note = 'Доставим';
            const uniqueDates = Array.from(new Set(packageItem.items.map(i => i.selectedDate)));
            return uniqueDates.reduce(
                (accum, current, index) =>
                    accum + `${index > 0 ? ', ' : ' '}${new Date(current).toLocaleDateString(this.locale, options)}`,
                'Доставим'
            );
        },

        onDateChanged(state) {
            this[CHANGE_PACKAGE_DATE]({ id: state.id, selectedDate: state.selectedDate[0] });
        },

        onChangeDate(state) {
            this[CHANGE_MODAL_STATE]({ name: 'checkout-date-modal', open: true, state });
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
