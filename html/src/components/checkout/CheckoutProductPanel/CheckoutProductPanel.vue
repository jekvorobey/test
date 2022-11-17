<template>
    <div class="checkout-product-panel">
        <template v-if="canDeliver">
            <div class="checkout-product-panel__item checkout-product-panel__item--recipient">
                <div
                    ref="recipient"
                    class="checkout-product-panel__item-header"
                    :class="{
                        'checkout-product-panel__item-header--error': recipientError && recipientError.length > 0,
                    }"
                >
                    <h2 class="checkout-product-panel__item-header-hl">Получатель</h2>
                </div>

                <ul class="checkout-product-panel__item-list">
                    <checkout-option-card
                        class="checkout-product-panel__item-card"
                        v-for="(recipient, index) in recipients"
                        :key="recipient.id"
                        :selected="selectedRecipient && isEqualObject(recipient, selectedRecipient)"
                        :show-check="recipients.length > 1"
                        :can-change="!isMainRecipient || index !== 0"
                        :error="
                            selectedRecipient &&
                            isEqualObject(recipient, selectedRecipient) &&
                            recipientError &&
                            recipientError.length > 0
                            || !recipient.phone
                            || !recipient.name
                        "
                        :btn-text="isMainRecipient ? 'Изменить' : 'Добавить'"
                        @cardClick="isMainRecipient ? onSetRecipient(recipient) : onChangeRecipient(recipient, index)"
                        @btnClick="onChangeRecipient(recipient, index)"
                    >
                        <p v-if="recipientError">
                            <span class="status-color-error">{{ recipientError }}</span>
                        </p>
                        <p v-if="recipient.name">{{ recipient.name }}</p>
                        <p v-else>Укажите пожалуйста ваше ФИО</p>
                        <p v-if="recipient.phone">{{ formatPhoneNumber(recipient.phone) }}</p>
                        <p v-else>Укажите пожалуйста ваш телефон</p>
                        <p v-if="recipient.email">{{ recipient.email }}</p>
                    </checkout-option-card>
                </ul>

                <v-link v-if="isMainRecipient" class="checkout-product-panel__item-header-link" tag="button" @click="onAddRecipient">
                    <v-svg name="plus" width="24" height="24" />&nbsp;Добавить нового получателя
                </v-link>
            </div>

            <transition name="fade">
                <div v-if="isMainRecipient">
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
                                    :disabled="!method.isAvailable"
                                    :loading="!method.isLoaded"
                                    readonly
                                    @cardClick="onSetReceiveMethod(method)"
                            >
                                <p class="text-bold">{{ method.title }}</p>
                                <p>
                                    <template v-if="method.price !== null"><price v-bind="method.price" />&nbsp;</template>
                                    <template v-if="method.cost">
                                        <price class="text-grey text-sm text-strike" v-bind="method.cost" />
                                    </template>
                                </p>
                                <p v-if="method.description" class="text-grey text-sm">{{ method.description }}</p>
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
                            <checkout-address-panel
                                    v-if="isDelivery"
                                    :error="addressError && addressError.length > 0"
                                    @change-address="onChangeAddress"
                                    @set-address="onSetAddress"
                            />

                            <checkout-pickup-point-panel
                                    v-else
                                    :error="addressError && addressError.length > 0"
                                    @change-address="onChangePickupPoint"
                            />
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
                                                <template v-if="!isTablet">&nbsp;&nbsp;Изменить дату и время</template>
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
                            <h2 class="checkout-product-panel__item-header-hl">
                                Способ оплаты <v-spinner width="24" height="24" :show="isPaymentMethodPending" />
                            </h2>
                        </div>

                        <ul class="checkout-product-panel__item-list">
                            <checkout-option-card
                                    class="checkout-product-panel__item-card"
                                    v-for="method in filteredPaymentMethods"
                                    :key="method.id"
                                    :selected="method.id === selectedPaymentMethodID"
                                    readonly
                                    :disabled="!method.is_available"
                                    @cardClick="onSetPaymentMethod(method)"
                            >
                                <div v-html="method.button_text" class="checkout-product-panel__item-payment"></div>
                                <div v-if="method.deficiency_price && method.deficiency_price > 0">
                                    {{ paymentMethodDeficiencyPriceTitle(method) }}
                                </div>
                            </checkout-option-card>
                        </ul>

                        <div
                                v-if="(referralPartner && availableBonus > 0) || (!referralPartner && maxAmountBonus)"
                                class="checkout-product-panel__item checkout-product-panel__item--child checkout-product-panel__item--bonus"
                        >
                            <div class="checkout-product-panel__item-header">
                                <v-check
                                        class="checkout-product-panel__item-panel-check checkout-paytype-container"
                                        type="radio"
                                        id="check-paytype-bonus"
                                        :model-value="selectedPayTypeID"
                                        :value="1"
                                        name="paytype"
                                        @change="onAddBonus(bonusAmount != 0 ? bonusAmount : maxAmountBonus)"
                                >
                                    <h3 class="checkout-product-panel__item-header-hl checkout-paytype-content">
                                        <v-svg name="bonus" width="24" height="24" />&nbsp;Оплата бонусами&nbsp;
                                        <span v-if="!isTablet" class="text-sm text-normal text-grey">
                                    (1 бонус = {{ bonusPerRub }} рубль)
                                </span>
                                        &nbsp;
                                        <v-spinner width="24" height="24" :show="isBonusPending" />
                                    </h3>
                                </v-check>
                            </div>

                            <div v-if="isBonusEdit" class="checkout-product-panel__item-controls">
                                <template v-if="availableBonus > 0">
                                    <v-input
                                            class="checkout-product-panel__item-controls-input"
                                            type="number"
                                            min="0"
                                            placeholder="Сколько списать?"
                                            v-model="bonusAmount"
                                            v-focus
                                            :max="maxAmountBonus"
                                            :disabled="isBonusPending"
                                            @keydown.enter.prevent="onAddBonus(bonusAmount)"
                                    />
                                    <v-button
                                            class="btn--outline checkout-product-panel__item-controls-btn"
                                            @click="onAddBonus(bonusAmount)"
                                            :disabled="isBonusPending"
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
                                <template v-if="maxAmountBonus > 0">
                            <span>
                                Будет использовано <strong class="text-bold">{{ bonus }}</strong
                            >&nbsp;из&nbsp;{{ availableBonus }} бонусных баллов&nbsp;
                            </span>
                                    <div class="checkout-product-panel__item-card-panel">
                                        <div v-if="isTablet" class="text-sm text-normal text-grey">
                                            (1 бонус = {{ bonusPerRub }} рубль)
                                        </div>
                                        <v-link
                                                class="checkout-product-panel__item-card-link"
                                                tag="button"
                                                @click="onEditBonus"
                                        >
                                            Изменить
                                        </v-link>
                                    </div>
                                </template>
                                <template v-else>
                            <span>
                                Доступно <strong class="text-bold">0</strong>&nbsp;из&nbsp;{{ availableBonus }} бонусных
                                баллов,&nbsp;т.к. товары уже со скидкой
                            </span>
                                    <div class="checkout-product-panel__item-card-panel">
                                        <div v-if="isTablet" class="text-sm text-normal text-grey">
                                            (1 бонус = {{ bonusPerRub }} рубль)
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div
                                class="checkout-product-panel__item checkout-product-panel__item--child checkout-product-panel__item--sertificate"
                        >
                            <div class="checkout-product-panel__item-header">
                                <v-check
                                        class="checkout-product-panel__item-panel-check checkout-paytype-container"
                                        type="radio"
                                        id="check-paytype-certificate"
                                        :model-value="selectedPayTypeID"
                                        :value="2"
                                        name="paytype"
                                        @change="applyCertificate"
                                >
                                    <h3 class="checkout-product-panel__item-header-hl checkout-paytype-content">
                                        <v-svg name="gift" width="24" height="24" />&nbsp;Оплата подарочным сертификатом&nbsp;
                                        <v-spinner width="24" height="24" :show="isCertificatePending" />
                                    </h3>
                                </v-check>
                            </div>

                            <div
                                    v-if="isСertAmountEdit"
                                    class="checkout-product-panel__item-controls checkout-product-panel__item"
                            >
                                <template v-if="isCertificateEdit">
                                    <v-input
                                            class="checkout-product-panel__item-controls-input"
                                            type="number"
                                            min="0"
                                            placeholder="Сколько списать?"
                                            v-model="customCertAmount"
                                            v-focus
                                            :max="maxCertificateDiscount"
                                            :disabled="isCertAmountPending"
                                            @keydown.enter.prevent="applyCertificate"
                                    />
                                    <v-button
                                            class="btn--outline checkout-product-panel__item-controls-btn"
                                            @click="applyCertificate"
                                            :disabled="isCertAmountPending"
                                    >
                                        Применить
                                    </v-button>
                                    <span class="checkout-product-panel__item-controls-text checkout-product-panel__item">
                                Доступно для оплаты&nbsp;
                                <strong class="text-bold">{{ maxCertificateDiscount }}</strong> ₽
                            </span>
                                </template>
                                <div v-else class="checkout-product-panel__item-card checkout-product-panel__item-card--bonus">
                            <span
                                    v-if="!certificatePayment"
                                    class="checkout-product-panel__item-controls-text checkout-product-panel__item"
                            >
                                Доступно для оплаты&nbsp;
                                <strong class="text-bold">{{ maxCertificateDiscount }}</strong> ₽
                            </span>
                                    <span
                                            v-if="certificatePayment"
                                            class="checkout-product-panel__item-controls-text checkout-product-panel__item"
                                    >
                                Будет использовано&nbsp;
                                <strong class="text-bold">{{ certificatePayment }}</strong> ₽ с сертификатов —
                                {{ aggCertNames }}
                            </span>
                                    <div class="checkout-product-panel__item-card-panel">
                                        <!-- <div v-if="isTablet" class="text-sm text-normal text-grey">
                                            (1 бонус = {{ bonusPerRub }} рубль)
                                        </div> -->
                                        <v-link
                                                class="checkout-product-panel__item-card-link"
                                                tag="button"
                                                @click="onEditCertificate"
                                        >
                                            Изменить
                                        </v-link>
                                    </div>
                                </div>
                            </div>
                            <div
                                    v-if="isСertAmountEdit"
                                    @click="onToggleActivateCert"
                                    @mousedown.prevent
                                    class="checkout-activate-toggle checkout-product-panel__item-header-hl"
                            >
                                <span>Активировать ещё один сертификат</span>
                                <v-svg
                                        v-if="!isVisibleActivateCert"
                                        name="arrow-down"
                                        width="24"
                                        height="24"
                                        @click="onToggleActivateCert"
                                />
                                <v-svg
                                        v-if="isVisibleActivateCert"
                                        name="arrow-up"
                                        width="24"
                                        height="24"
                                        @click="onToggleActivateCert"
                                />
                            </div>
                            <div
                                    v-if="isVisibleActivateCert || !isСertAmountEdit"
                                    class="checkout-product-panel__item-controls checkout-activate-baseline"
                            >
                                <v-input
                                        v-model="certificateCode"
                                        class="checkout-product-panel__item-controls-input"
                                        placeholder="Введите номер сертификата"
                                        @keydown.enter.prevent="activateCertificate"
                                        :error="activateError"
                                        :success="activateSuccess"
                                        :show-error="!!activateError"
                                        :show-success="!!activateSuccess"
                                        @input="onActivateInput"
                                />
                                <v-button
                                        class="btn--outline checkout-product-panel__item-controls-btn"
                                        :disabled="!certificateCode"
                                        @click="activateCertificate"
                                        @mousedown.prevent
                                >
                                    Активировать
                                </v-button>
                            </div>
                        </div>

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
                                            :to="{ name: 'InfoPageAgreement', params: { code: agreementTypes.PUBLIC_OFFER } }"
                                            target="_blank"
                                    >
                                        условиями оферты
                                    </router-link>
                                    и
                                    <router-link
                                            :to="{ name: 'InfoPageAgreement', params: { code: agreementTypes.PERSONAL_POLICY } }"
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
                </div>
            </transition>

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
            <address-edit-modal v-if="$isServer || isAddressModalOpen" @save="onSaveAddress" />
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

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { NAME as AUTH_MODULE, REFERRAL_PARTNER, USER, HAS_SESSION } from '@store/modules/Auth';
import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { FETCH_CART_DATA } from '@store/modules/Cart/actions';

import { ACTIVATE_CERTIFICATE, FETCH_CERTIFICATES } from '@store/modules/Certificate/actions';

import { paymentTypes } from '@enums/checkout';

import {
    ACTIVE_CERTIFICATES,
    ACTIVE_CERTIFICATE_STATUS,
    // RECEIVE_METHOD_STATUS, // TODO: пофиксить название константы, а то конфликтует с аналогичным названием из модуля Checkout
} from '@store/modules/Certificate/getters';

import { NAME as CERTIFICATE_MODULE, CERTIFICATE_TYPE, CERTIFICATE_DATA } from '@store/modules/Certificate';

import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import {
    SET_RECIPIENT,
    SET_RECEIVE_METHOD,
    SET_DELIVERY_TYPE,
    CHANGE_CHUNK_DATE,
    ADD_BONUS,
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
    FETCH_CHECKOUT_DATA,
    SET_SELECTED_PICKUP_POINT,
    SET_PAYMENT_METHOD,
} from '@store/modules/Checkout/actions';

import {
    RECIPIENTS,
    SELECTED_RECIPIENT,
    SELECTED_RECEIVE_METHOD_ID,
    RECEIVE_METHODS,
    SELECTED_ADDRESS,
    DELIVERY_TYPES,
    SELECTED_DELIVERY_TYPE,
    SELECTED_PICKUP_POINT,
    PAYMENT_METHODS,
    SELECTED_PAYMENT_METHOD_ID,
    CONFIRMATION_TYPES,
    BONUS,
    CERTIFICATES,
    AGREEMENT,
    SUBSCRIBE,
    PROMO_CODE,
    SELECTED_CONFIRMATION_TYPE_ID,
    BONUS_PER_RUB,
    CERTIFICATE_PAYMENT,
    AVAILABLE_BONUS,
    MAX_BONUS,
    MAX_CERTIFICATE_DISCOUNT,
    ADDRESS_STATUS,
    BONUS_STATUS,
    CERTIFICATE_STATUS,
    PROMOCODE_STATUS,
    RECEIVE_METHOD_STATUS,
    PAYMENT_METHOD_STATUS,
} from '@store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import validationMixin, { required } from '@plugins/validation';
import { formatPhoneNumber, getPosition, getDate, pluralize } from '@util';
import { deliveryTypes, receiveMethods } from '@enums/checkout';
import { requestStatus, modalName, agreementTypes, httpCodes } from '@enums';
import { SCROLL_DEBOUNCE_TIME } from '@constants';

import { cartItemTypes } from '@enums/product';

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
import '@images/sprites/payment/b2b-sberbank.svg';
import '@images/sprites/payment/alfa.svg';
import '@images/sprites/payment/sber-pay.svg';
import '@images/sprites/payment/sbp.svg';
import '@images/sprites/payment/tinkoff.svg';
import '@images/sprites/payment/ukassa.svg';
import '@images/sprites/plus.svg';
import '@images/sprites/edit.svg';
import '@images/sprites/gift.svg';
import '@images/sprites/arrow-down.svg';
import '@images/sprites/arrow-up.svg';
import '@images/sprites/Union.svg';
import './CheckoutProductPanel.css';
import { dayMonthLongDateSettings } from '@settings';

function prepareChunkItem(chunkItem) {
    const selectedDate = chunkItem.selectedDate ? getDate(chunkItem.selectedDate) : null;

    return {
        ...chunkItem,
        selectedDate,
    };
}

function prepareDeliveryType(deliveryType) {
    const { items } = deliveryType;
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
                        valid: (value) => value === true,
                    },

                    [SELECTED_RECIPIENT]: {
                        required,
                        hasName: (value) => value && !!value.name,
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
                        valid: (value) => value === true,
                    },

                    [SELECTED_RECIPIENT]: {
                        required,
                        hasName: (value) => value && !!value.name,
                    },

                    [SELECTED_ADDRESS]: {
                        required,
                        valid: (value) => !!value && value.geo_lat !== undefined && value.geo_lon !== undefined,
                    },
                };
        }
    },

    data() {
        return {
            isBonusEdit: false,
            isCertificateEdit: false,
            bonusAmount: null,
            certificateCode: null,
            recipientIndexToChange: null,
            certPrices: [],
            isVisibleActivateCert: false,
            customCertAmount: null,
            activateError: '',
            activateSuccess: '',
            selectedPayTypeID: null,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false,
            HAS_SESSION,
        }),
        ...mapState(MODAL_MODULE, {
            isPickupPointModalOpen: (state) =>
                state[MODALS][CheckoutPickupPointModal.name] && state[MODALS][CheckoutPickupPointModal.name].open,
            isDateModalOpen: (state) =>
                state[MODALS][CheckoutDateModal.name] && state[MODALS][CheckoutDateModal.name].open,
            isAddressModalOpen: (state) =>
                state[MODALS][modalName.profile.ADDRESS_EDIT] && state[MODALS][modalName.profile.ADDRESS_EDIT].open,
            isRecipientModalOpen: (state) =>
                state[MODALS][modalName.checkout.RECIPIENT_EDIT] &&
                state[MODALS][modalName.checkout.RECIPIENT_EDIT].open,
        }),

        ...mapState(CERTIFICATE_MODULE, [CERTIFICATE_TYPE, CERTIFICATE_DATA]),
        ...mapGetters(CERTIFICATE_MODULE, [RECEIVE_METHOD_STATUS, ACTIVE_CERTIFICATE_STATUS, ACTIVE_CERTIFICATES]),

        ...mapGetters(CHECKOUT_MODULE, [
            BONUS_PER_RUB,
            AVAILABLE_BONUS,
            MAX_BONUS,
            MAX_CERTIFICATE_DISCOUNT,
            RECIPIENTS,
            SELECTED_RECIPIENT,

            RECEIVE_METHODS,
            SELECTED_RECEIVE_METHOD_ID,

            PAYMENT_METHODS,
            SELECTED_PAYMENT_METHOD_ID,

            CONFIRMATION_TYPES,
            SELECTED_CONFIRMATION_TYPE_ID,

            SELECTED_ADDRESS,

            SELECTED_PICKUP_POINT,

            DELIVERY_TYPES,
            SELECTED_DELIVERY_TYPE,

            CERTIFICATE_PAYMENT,

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
            PAYMENT_METHOD_STATUS,
        ]),

        ...mapState(GEO_MODULE, [SELECTED_CITY]),

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

        isMainRecipient() {
            return this[RECIPIENTS][0].name !== null && this[RECIPIENTS][0].phone !== null;
        },

        filteredPaymentMethods() {
            return this.paymentMethods.filter((paymentMethod) => !paymentMethod.is_hidden);
        },

        isPaymentMethodPending() {
            return this[PAYMENT_METHOD_STATUS] === requestStatus.PENDING;
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

        isCertAmountPending() {
            // isCertificatePending
            // TODO: CERTIFICATE_STATUS -> CERT_AMOUNT_STATUS
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
                return 'Подтвердите согласие с условиями заказа и доставки';
            }

            return null;
        },

        addressError() {
            const selectedId = this[SELECTED_RECEIVE_METHOD_ID];

            switch (selectedId) {
                case receiveMethods.PICKUP:
                    if (this.$v.selectedPickupPoint.$dirty && !this.$v.selectedPickupPoint.required) {
                        return 'Укажите пункт самовывоза';
                    }
                    break;

                case receiveMethods.DELIVERY:
                case receiveMethods.EXPRESS:
                default:
                    if (
                        this.$v.selectedAddress.$dirty &&
                        (!this.$v.selectedAddress.required || !this.$v.selectedAddress.valid)
                    ) {
                        return 'Укажите адрес доставки';
                    }
                    break;
            }

            return null;
        },

        recipientError() {
            if (!this.$v.selectedRecipient.$dirty) {
                return null;
            }

            let message = '';

            if (!this.$v.selectedRecipient.required) {
                message = 'Пожалуйста, укажите получателя';
            }

            if (!this.$v.selectedRecipient.hasName) {
                message = 'Пожалуйста, добавьте данные получателя';
            }

            if (message.length > 0) {
                return message;
            }

            return null;
        },

        maxAmountBonus() {
            return this[MAX_BONUS] < this[AVAILABLE_BONUS] ? this[MAX_BONUS] : this[AVAILABLE_BONUS];
        },

        // Общая сумма сертификатов
        availableCertAmount() {
            let am = this[ACTIVE_CERTIFICATES].map((c) => c.balance);
            return am.length > 0 ? am.reduce((a, b) => a + b) : 0;
        },

        // Названия сертификатов через запятую
        aggCertNames() {
            let am = this.cards.map((c) => c.code);
            return am.length > 0 ? am.join(', ') : '';
        },

        isСertAmountEdit() {
            return this.availableCertAmount > 0;
        },

        // сертификаты, которые добавлены к оплате заказа
        cards() {
            return this[CERTIFICATES] ? this[CERTIFICATES] : [];
        },

        // все активные сертификаты пользоватлея
        activeCards() {
            return this[ACTIVE_CERTIFICATES] ? this[ACTIVE_CERTIFICATES] : [];
        },
    },

    watch: {
        isBonusEdit(value) {
            if (value) this.bonusAmount = this[BONUS];
        },
        [SELECTED_CITY]() {
            this[SET_SELECTED_PICKUP_POINT](null);
        },
        // Не разобрался, что нужно добавить в тело метода чтобы по аналогии с бонусами сделать
        // isCertificateEdit(value) {
        //     if (value) this.certificateAmount = this[CERTIFICATE]; // ???
        // },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [
            CHANGE_CHUNK_DATE,
            SET_RECEIVE_METHOD,

            SET_DELIVERY_TYPE,
            SET_AGREEMENT,
            SET_SUBSCRIBE,
            SET_CONFIRMATION_TYPE,

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

            FETCH_CHECKOUT_DATA,

            SET_SELECTED_PICKUP_POINT,

            SET_PAYMENT_METHOD,
        ]),

        ...mapActions(CERTIFICATE_MODULE, [ACTIVATE_CERTIFICATE]),

        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        ...mapActions(CART_MODULE, [FETCH_CART_DATA]),

        validate() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.scrollToErrorField();
            }

            return !this.$v.$invalid;
        },

        validateVitalFields() {
            if (typeof this.$v[SELECTED_RECIPIENT] !== 'undefined') {
                this.$v[SELECTED_RECIPIENT].$touch();

                if (!this.$v[SELECTED_RECIPIENT].$invalid) {
                    return true;
                } else {
                    this.scrollToErrorField();
                    return false;
                }
            } else {
                return true;
            }
        },

        async callCheckoutModificationMethod(action) {
            let otherArguments = [];

            for (let i = 1; i < arguments.length; i++) {
                otherArguments.push(arguments[i]);
            }

            if (this.validateVitalFields()) {
                await this[action](...otherArguments);
            }
        },

        scrollToErrorField() {
            if (this.recipientError) {
                this.debounce_scrollToError(this.$refs.recipient);
            } else if (this.addressError) {
                this.debounce_scrollToError(this.$refs.address);
            } else if (this.agreementError) {
                this.debounce_scrollToError(this.$refs.agreement);
            }
        },

        formatPhoneNumber(phone) {
            return formatPhoneNumber(phone);
        },

        generateChunkNote(chunkItem) {
            const { selectedDate, selectedTime } = chunkItem || {};
            const today = new Date().getDate();

            if (selectedDate) {
                let additionalText = ``;
                if (today === selectedDate.getDate()) additionalText = `сегодня`;
                else if (today + 1 === selectedDate.getDate()) additionalText = `завтра`;
                else additionalText = this.$t(`weekdays.long.${selectedDate.getDay()}`);

                const timeString = selectedTime ? `, с ${selectedTime.from} до ${selectedTime.to}` : '';

                return `${selectedDate.toLocaleDateString(
                    this[LOCALE],
                    dayMonthLongDateSettings
                )}, ${additionalText}${timeString}`;
            }
            return 'Для данного адреса сейчас нет доступных дат доставки';
        },

        generatePackageNote(deliveryType) {
            if (deliveryType.typeID === deliveryTypes.CONSOLIDATION) {
                const date = new Date(deliveryType.items[0].selectedDate);
                return `Доставим всё ${date.toLocaleDateString(this[LOCALE], dayMonthLongDateSettings)}`;
            }

            const uniqueDates = Array.from(
                new Set(
                    deliveryType.items.map((i) =>
                        new Date(i.selectedDate).toLocaleDateString(this[LOCALE], dayMonthLongDateSettings)
                    )
                )
            );
            return uniqueDates.reduce(
                (accum, current, index) => accum + `${index > 0 ? ', ' : ' '}${current}`,
                'Доставим'
            );
        },

        onSetConfirmationType(value) {
            this[SET_CONFIRMATION_TYPE](value);
        },

        onSetAddress() {
            this.validateVitalFields();
        },

        onSetReceiveMethod(method) {
            this.callCheckoutModificationMethod(SET_RECEIVE_METHOD, method);
        },

        paymentMethodDeficiencyPriceTitle(method) {
            return `(Доберите еще ${method.deficiency_price} ${pluralize(method.deficiency_price, ['рубль', 'рубля', 'рублей'])})`;
        },

        onSetPaymentMethod(method) {
            if (!method.is_available) {
                return;
            }

            this.callCheckoutModificationMethod(SET_PAYMENT_METHOD, method);
        },

        onSetAgreement(value) {
            this[SET_AGREEMENT](Number(value));
        },

        onSetDeliveryType(id) {
            const selectedType = this[DELIVERY_TYPES] && this[DELIVERY_TYPES].find((t) => t.id === id);
            this[SET_DELIVERY_TYPE](selectedType);
        },

        onDateChanged(state) {
            const { id, selectedDate, selectedTime } = state;
            this[CHANGE_CHUNK_DATE]({
                id,
                selectedDate,
                selectedTime,
            });
        },

        onChangeDate(chunkItemId) {
            const deliveryType = this[SELECTED_DELIVERY_TYPE];
            const chunkItem = deliveryType.items.find((i) => i.id === chunkItemId);

            const state = {
                id: chunkItem.id,
                selectedDate: [chunkItem.selectedDate],
                selectedTime: chunkItem.selectedTime,
                availableDates: [...chunkItem.availableDates],
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

        onChangeAddress({ address }) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.ADDRESS_EDIT,
                open: true,
                state: { address: { ...address }, btnText: 'Привезти сюда' },
            });
        },

        onAddAddress() {
            this[CHANGE_MODAL_STATE]({
                name: modalName.profile.ADDRESS_EDIT,
                open: true,
                state: { address: {}, btnText: 'Привезти сюда' },
            });
        },

        async onSaveAddress(address) {
            try {
                await this[CHANGE_ADDRESS](address);
            } catch (error) {
                const { status } = error;
                if (status === httpCodes.BAD_REQUEST)
                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.NOTIFICATION,
                        open: true,
                        state: {
                            title: 'Уведомление',
                            message: 'По указаному адресу доставка невозможна. Введите другой адрес.',
                        },
                    });
            }
        },

        onChangePickupPoint() {
            this[CHANGE_MODAL_STATE]({ name: CheckoutPickupPointModal.name, open: true });
        },

        onEditBonus() {
            this.isBonusEdit = true;
        },

        onEditCertificate() {
            this.isCertificateEdit = true;
            this.customCertAmount =
                this.customCertAmount && this.customCertAmount > this.maxCertificateDiscount
                    ? this.maxCertificateDiscount
                    : this.customCertAmount;
            // isСertAmountEdit
        },

        async onAddBonus(value) {
            if (this.bonusAmount != value) {
                this.bonusAmount = value;
            }
            try {
                if (value != this[BONUS]) {
                    await this[ADD_BONUS](value || 0);
                }
                this.isBonusEdit = false;
                this.isCertificateEdit = false;
                this.customCertAmount = null;
                this.selectedPayTypeID = (value || 0) === 0 ? null : 1; // bonus pay type - 1
            } catch (error) {
                this.isBonusEdit = true;
            }
        },

        onActivateInput() {
            this.activateError = '';
            this.activateSuccess = '';
        },

        ...mapActions(CERTIFICATE_MODULE, [FETCH_CERTIFICATES, ACTIVATE_CERTIFICATE]),

        async fetchCards() {
            this.loading = true;
            try {
                await this[FETCH_CERTIFICATES]();
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },

        async applyCertificate() {
            // TODO: не выводится сообщение об ошибке, например "Не указана сумма операции"
            if (this.customCertAmount == null) {
                this.customCertAmount = this.maxCertificateDiscount;
            }
            try {
                await this.callCheckoutModificationMethod(ADD_CERTIFICATE, this.customCertAmount || 0);
                this.isCertificateEdit = false;
                this.isBonusEdit = false;
                this.selectedPayTypeID = Number(this.customCertAmount || 0) === 0 ? null : 2; // certificate pay type - 2
            } catch (error) {
                this.isCertificateEdit = true;
            }
        },

        async activateCertificate() {
            if (!this.certificateCode || this.certificateCode.trim() === '') {
                return;
            }
            try {
                this.$progress.start();
                await this[ACTIVATE_CERTIFICATE](this.certificateCode);
                let repl = this[CERTIFICATE_DATA];
                if (this[ACTIVE_CERTIFICATE_STATUS] == 'success') {
                    this.activateSuccess = repl && repl.message ? repl.message : ''; // Нужно решить, что вывести по умолчанию, если с сервера потлетел ответ с пустым сообщением
                } else {
                    this.activateError = repl && repl.message ? repl.message : 'Произошла неизвестная ошибка';
                }
                this.$progress.finish();
                this.certificateCode = '';
            } catch (e) {
                const { status } = e;
                switch (status) {
                    case httpCodes.BAD_REQUEST:
                        this.activateError =
                            e.data && e.data.message ? e.data.message : 'Не удалось активировать сертификат'; // this.$t('validation.errors.promocodeInvalid');
                        break;
                    case httpCodes.NOT_FOUND:
                        this.activateError =
                            e.data && e.data.message ? e.data.message : 'Не удалось активировать сертификат'; // this.$t('validation.errors.promocodeNotExist');
                        break;
                }
                this.$progress.fail();
                this.$progress.finish(); // finish после fail точно необходим?
            }
            setTimeout(() => {
                this.activateError = '';
                this.activateSuccess = '';
                this.isVisibleActivateCert = false;
            }, 5000);

            try {
                await this[FETCH_CHECKOUT_DATA](cartItemTypes.PRODUCT);
            } catch (error) {
                console.error(error);
            }

            this.fetchCards();
        },

        // async activate() {
        //     if (!this.certificate || this.certificate.trim() === '') {
        //         return
        //     }
        //     try {
        //         this.$progress.start()
        //         await this[ACTIVATE_CERTIFICATE](this.certificate)
        //         this.$progress.finish()
        //         this.certificate = ''
        //         this.fetchCards()
        //     } catch (e) {
        //         this.activateError =
        //                  e.data && e.data.message ? e.data.message : 'Не удалось активировать сертификат'
        //         this.$progress.fail()
        //         this.$progress.finish() // finish после fail точно необходим?
        //     }
        // },

        // TODO: связать с беком
        // async onAddCertAmount(value) {
        //     // try {
        //     //     await this[ADD_CERT_AMOUNT](value || 0);
        //     //     this.isCertAmountEdit = false;
        //     // } catch (error) {
        //     //     this.isCertAmountEdit = true;
        //     // }
        // },

        scrollToError(element, offset = 0) {
            // TODO: не работающий код прокрутки, после тестов удалить
            // const panelScrollOffset = 24;
            // window.scrollTo({ top: getPosition(element).y - panelScrollOffset, behavior: 'smooth' });

            window.scrollTo({ top: element.offsetTop + offset, behavior: 'smooth' });
        },

        generateItemProductUrl(product) {
            if (Array.isArray(product.categoryCodes)) {
                const categoryCode = product.categoryCodes[product.categoryCodes.length - 1];
                return generateProductUrl(categoryCode, product.code);
            }
        },
        onToggleActivateCert() {
            this.isVisibleActivateCert = !this.isVisibleActivateCert;
        },
    },

    created() {
        this.agreementTypes = agreementTypes;
    },

    async mounted() {
        this.debounce_scrollToError = _debounce(this.scrollToError, SCROLL_DEBOUNCE_TIME);

        this.fetchCards();

        if (this.maxAmountBonus > 0) {
            await this.onAddBonus(this.maxAmountBonus);
        } else {
            this.bonusAmount = 0;
        }

        this.customCertAmount = this.maxCertificateDiscount;
    },
};
</script>
