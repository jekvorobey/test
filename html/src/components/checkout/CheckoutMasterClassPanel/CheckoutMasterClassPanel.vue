<template>
    <div class="checkout-master-class-panel">
        <div class="checkout-master-class-panel__item checkout-master-class-panel__item--recipient">
            <div class="container container--tablet checkout-master-class-panel__item-container">
                <div class="checkout-master-class-panel__item-header">
                    <h2 class="checkout-master-class-panel__item-header-hl">Получатель</h2>
                </div>
            </div>

            <ul class="container container--tablet checkout-master-class-panel__item-list">
                <checkout-option-card
                    class="checkout-master-class-panel__item-card"
                    v-for="(recipient, index) in recipients"
                    :key="recipient.id"
                    :selected="selectedRecipient && isEqualObject(recipient, selectedRecipient)"
                    :show-check="recipients.length > 1"
                    :error="recipientError && recipientError.length > 0"
                    @cardClick="onSetRecipient(recipient)"
                    @btnClick="onChangeRecipient(recipient, index)"
                >
                    <p v-if="recipient.name">{{ recipient.name }}</p>
                    <p v-if="recipient.phone">{{ formatPhoneNumber(recipient.phone) }}</p>
                    <p v-if="recipient.email">{{ recipient.email }}</p>

                    <p v-if="recipientError">
                        <span class="status-color-error">{{ recipientError }}</span>
                    </p>
                </checkout-option-card>
            </ul>

            <v-link class="checkout-master-class-panel__item-header-link" tag="button" @click="onAddRecipient">
                <v-svg name="plus" width="24" height="24" />&nbsp;Добавить нового получателя
            </v-link>
        </div>

        <attention-panel class="checkout-master-class-panel__attention">
            <span>На указанный адрес электронной почты мы вышлем вам копии билетов</span>
        </attention-panel>

        <template v-if="!$v.selectedRecipient.$invalid">
            <div class="checkout-master-class-panel__item">
                <div class="container container--tablet checkout-master-class-panel__item-container">
                    <div class="checkout-master-class-panel__item-header" ref="events">
                        <h2 class="checkout-master-class-panel__item-header-hl">
                            Участники&nbsp;<v-spinner width="24" height="24" :show="isTicketPending" />
                        </h2>
                    </div>
                </div>

                <div
                    class="checkout-master-class-panel__item-tickets"
                    v-for="({ cartItem: { p: product, count }, tickets, offerId }, index) in masterClasses"
                    :key="offerId"
                >
                    <checkout-masterclass-card
                        class="checkout-master-class-panel__item-masterclass"
                        type="masterclass"
                        :key="product.id"
                        :product-id="product.id"
                        :name="product.name"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :date="product.dateTime"
                        :author="product.author"
                        :count="count"
                        :href="product.url"
                        :is-small="isTablet"
                    >
                        <source :data-srcset="product.desktopImg.webp" type="image/webp" />
                        <source :data-srcset="product.desktopImg.orig" />
                        <img class="blur-up lazyload v-picture__img" :data-src="product.defaultImg" alt="" />
                    </checkout-masterclass-card>

                    {{ publicEventsError }}

                    <ul class="container container--tablet checkout-master-class-panel__item-list">
                        <checkout-option-card
                            class="checkout-master-class-panel__item-card"
                            v-for="(ticket, index) in tickets"
                            :key="ticket.id"
                            :show-check="false"
                            selected
                            @btnClick="onChangeTicket(ticket, offerId, index)"
                        >
                            <p class="text-bold">Билет {{ index + 1 }}</p>
                            <p>
                                <span>{{ ticket.lastName }} {{ ticket.firstName }} {{ ticket.middleName }},</span>
                                <span v-if="professionsMap[ticket.professionId]">
                                    {{ professionsMap[ticket.professionId].name }}
                                </span>
                            </p>
                            <p>{{ formatPhoneNumber(ticket.phone) }}</p>
                            <p>{{ ticket.email }}</p>
                        </checkout-option-card>

                        <checkout-option-card
                            v-if="tickets.length < count"
                            class="checkout-master-class-panel__item-card"
                            :class="{
                                'checkout-master-class-panel__item-card--invalid':
                                    $v.publicEvents.$anyDirty && !$v.publicEvents.$each.$iter[index].isFull,
                            }"
                            key="new"
                            :show-check="false"
                            selected
                            readonly
                        >
                            <button
                                class="checkout-master-class-panel__item-card-link text-grey"
                                :class="{
                                    'status-color-error':
                                        $v.publicEvents.$anyDirty && !$v.publicEvents.$each.$iter[index].isFull,
                                }"
                                @click="onAddTicket(offerId)"
                            >
                                Введите данные
                            </button>
                            <br />
                            <br />
                        </checkout-option-card>
                    </ul>
                </div>
            </div>

            <div class="checkout-master-class-panel__item checkout-master-class-panel__item--payment">
                <div class="container container--tablet checkout-master-class-panel__item-container">
                    <div class="checkout-master-class-panel__item-header">
                        <h2 class="checkout-master-class-panel__item-header-hl">
                            Способ оплаты <v-spinner width="24" height="24" :show="isPaymentMethodPending" />
                        </h2>
                    </div>
                </div>

                <ul class="container container--tablet checkout-master-class-panel__item-list">
                    <checkout-option-card
                        class="checkout-master-class-panel__item-card"
                        v-for="method in paymentMethods"
                        :key="method.id"
                        :selected="method.id === selectedPaymentMethodID"
                        readonly
                        :disabled="!method.is_available"
                        @cardClick="onSetPaymentMethod(method)"
                    >
                        <div>
                            <div v-if="method.deficiencyPrice && method.deficiencyPrice > 0" class="text-bold">
                                Доберите еще {{ method.deficiencyPrice }} рублей
                            </div>
                            <div v-if="!method.deficiencyPrice" v-html="method.button_text" class="checkout-master-class-panel__item-payment">
                            </div>
                        </div>
                    </checkout-option-card>
                </ul>

                <!-- <button @click="applyCertificate">Использовать 200 сертификатный рублей</button> -->

                <div
                    class="checkout-master-class-panel__item checkout-master-class-panel__item--child checkout-master-class-panel__item--sertificate"
                >
                    <h3 class="checkout-master-class-panel__item-header-hl checkout-paytype-content">
                        <v-svg name="gift" width="24" height="24" />&nbsp;Оплата подарочным сертификатом&nbsp;
                        <v-spinner width="24" height="24" :show="isCertificatePending" />
                    </h3>
                    <div v-if="isСertAmountEdit" class="checkout-master-class-panel__item-controls checkout-master-class-panel__item">
                        <template v-if="isCertificateEdit">
                            <v-input
                                class="checkout-master-class-panel__item-controls-input"
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
                                class="btn--outline checkout-master-class-panel__item-controls-btn"
                                @click="applyCertificate"
                                :disabled="isCertAmountPending"
                            >
                                Применить
                            </v-button>
                            <span class="checkout-master-class-panel__item-controls-text checkout-master-class-panel__item">
                                Доступно для оплаты&nbsp;
                                <strong class="text-bold">{{ maxCertificateDiscount }}</strong> ₽
                            </span>
                        </template>
                        <div v-else class="checkout-master-class-panel__item-card checkout-master-class-panel__item-card--bonus">
                            <span v-if="!certificatePayment" class="checkout-master-class-panel__item-controls-text checkout-master-class-panel__item">
                                Доступно для оплаты&nbsp;
                                <strong class="text-bold">{{ maxCertificateDiscount }}</strong> ₽
                            </span>
                            <span v-if="certificatePayment" class="checkout-master-class-panel__item-controls-text checkout-master-class-panel__item">
                                Будет использовано&nbsp;
                                <strong class="text-bold">{{ certificatePayment }}</strong> ₽ с сертификатов — {{ aggCertNames }}
                            </span>
                            <div class="checkout-master-class-panel__item-card-panel">
                                <!-- <div v-if="isTablet" class="text-sm text-normal text-grey">
                                    (1 бонус = {{ bonusPerRub }} рубль)
                                </div> -->
                                <v-link class="checkout-master-class-panel__item-card-link" tag="button" @click="onEditCertificate">
                                    Изменить
                                </v-link>
                            </div>
                        </div>
                    </div>
                    <div v-if="isСertAmountEdit" @click="onToggleActivateCert" @mousedown.prevent class="checkout-activate-toggle checkout-master-class-panel__item-header-hl">
                        <span>Активировать ещё один сертификат</span>
                        <v-svg v-if="!isVisibleActivateCert" name="arrow-down" width="24" height="24" @click="onToggleActivateCert" />
                        <v-svg v-if="isVisibleActivateCert" name="arrow-up" width="24" height="24" @click="onToggleActivateCert" />
                    </div>
                    <div v-if="isVisibleActivateCert || !isСertAmountEdit" class="checkout-master-class-panel__item-controls checkout-activate-baseline">
                        <v-input
                            v-model="certificateCode"
                            class="checkout-master-class-panel__item-controls-input"
                            placeholder="Введите номер сертификата"
                            @keydown.enter.prevent="activateCertificate"
                            :error="activateError"
                            :success="activateSuccess"
                            :show-error="!!activateError"
                            :show-success="!!activateSuccess"
                            @input="onActivateInput"
                        />
                        <v-button
                            class="btn--outline checkout-master-class-panel__item-controls-btn"
                            :disabled="!certificateCode"
                            @click="activateCertificate"
                            @mousedown.prevent
                        >
                            Активировать
                        </v-button>
                    </div>
                </div>

                <div
                    class="checkout-master-class-panel__item checkout-master-class-panel__item checkout-master-class-panel__item--child checkout-master-class-panel__item--settings"
                >
                    <div class="container container--tablet checkout-master-class-panel__item-panel" ref="agreement">
                        <!-- #58436 -->
                        <!-- <v-check
                        id="check-promo"
                        :checked="subscribe"
                        class="checkout-master-class-panel__item-panel-check"
                        name="promo"
                        @change="SET_SUBSCRIBE(Number($event))"
                    >
                        Сообщать мне об акциях, скидках и специальных предложениях
                    </v-check> -->

                        <v-check
                            id="check-agreement"
                            :checked="agreement"
                            class="checkout-master-class-panel__item-panel-check"
                            name="agreement"
                            @change="onSetAgreement"
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

                    <div class="container container--tablet checkout-master-class-panel__item-panel">
                        <v-check
                            class="checkout-master-class-panel__item-panel-check"
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

        <transition name="fade">
            <checkout-recipient-modal
                v-if="$isServer || isRecipientModalOpen"
                :required-fields="['name', 'phone', 'email']"
                :strong-full-name-validation="true"
                @save="onSaveRecipient"
                @close="onCloseRecipientModal"
            />
        </transition>

        <transition name="fade">
            <checkout-ticket-modal
                v-if="$isServer || isTicketModalOpen"
                @save="onSaveTicket"
                @close="onCloseTicketModal"
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

import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';
import CheckoutMasterclassCard from '@components/checkout/CheckoutMasterclassCard/CheckoutMasterclassCard.vue';
import CheckoutRecipientModal from '@components/checkout/CheckoutRecipientModal/CheckoutRecipientModal.vue';
import CheckoutTicketModal from '@components/checkout/CheckoutTicketModal/CheckoutTicketModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { LOCALE } from '@store';

import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import {
    SET_RECIPIENT,
    ADD_PROMOCODE,
    DELETE_PROMOCODE,
    SET_AGREEMENT,
    SET_SUBSCRIBE,
    SET_CONFIRMATION_TYPE,
    CHANGE_RECIPIENT,
    ADD_RECIPIENT,
    ADD_TICKET,
    CHANGE_TICKET,
    ADD_CERTIFICATE,
    FETCH_CHECKOUT_DATA,
    SET_PUBLIC_EVENT_PAYMENT_METHOD,
} from '@store/modules/Checkout/actions';

import {
    RECIPIENTS,
    SELECTED_RECIPIENT,
    PAYMENT_METHODS,
    SELECTED_PAYMENT_METHOD_ID,
    CONFIRMATION_TYPES,
    SELECTED_CONFIRMATION_TYPE_ID,
    AGREEMENT,
    SUBSCRIBE,
    PROMO_CODE,
    PROMOCODE_STATUS,
    MAX_CERTIFICATE_DISCOUNT,
    CERTIFICATE_PAYMENT,
    PUBLIC_EVENTS,
    TICKET_STATUS,
    PROFESSIONS_MAP,
    CERTIFICATE_STATUS,
    CERTIFICATES,
    RECEIVE_METHOD_STATUS, PAYMENT_METHOD_STATUS,
} from '@store/modules/Checkout/getters';

import { NAME as CERTIFICATE_MODULE, CERTIFICATE_TYPE, CERTIFICATE_DATA } from '@store/modules/Certificate';
import {
    ACTIVATE_CERTIFICATE,
    FETCH_CERTIFICATES,
} from '@store/modules/Certificate/actions';

import {
    ACTIVE_CERTIFICATES,
    ACTIVE_CERTIFICATE_STATUS,
    // RECEIVE_METHOD_STATUS, // TODO: пофиксить название константы, а то конфликтует с аналогичным названием из модуля Checkout
} from '@store/modules/Certificate/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import _isEqual from 'lodash/isEqual';
import _debounce from 'lodash/debounce';

import { cartItemTypes } from '@enums/product';

import { SCROLL_DEBOUNCE_TIME } from '@constants';
import { requestStatus, agreementTypes, fileExtension, modalName } from '@enums';
import { DEFAULT_TICKET_PROFESSIONAL_ID } from '@constants/checkout';
import { getPosition, formatPhoneNumber, getDate } from '@util';
import { generateMasterclassUrl } from '@util/catalog';
import { generatePictureSourcePath } from '@util/file';
import { dayMonthLongDateSettings, hourMinuteTimeSettings } from '@settings';
import validationMixin, { required, minLength, email, nameRu, fio } from '@plugins/validation';

import '@images/sprites/payment/bonus.svg';
import '@images/sprites/payment/visa.svg';
import '@images/sprites/payment/mastercard.svg';
import '@images/sprites/payment/mir.svg';
import '@images/sprites/payment/apple.svg';
import '@images/sprites/payment/google.svg';
import '@images/sprites/payment/yandex.svg';
import '@images/sprites/plus.svg';
import './CheckoutMasterClassPanel.css';
import { paymentTypes } from '@enums/checkout';

export default {
    name: 'checkout-master-class-panel',
    mixins: [validationMixin],

    components: {
        VSvg,
        VLink,
        VInput,
        VButton,
        VCheck,
        VSpinner,

        AttentionPanel,

        CheckoutMasterclassCard,
        CheckoutOptionCard,

        CheckoutRecipientModal,
        CheckoutTicketModal,
    },

    validations: {
        [AGREEMENT]: {
            valid: (value) => value === true,
        },

        [SELECTED_RECIPIENT]: {
            required,
            hasEmail: (value) => value && !!value.email,
            hasName: (value) => value && !!value.name,
            nameRu: (value) => nameRu(value.name),
            fio: (value) => fio(value.name),
        },

        [PUBLIC_EVENTS]: {
            $each: {
                isFull: (value) => value.tickets.length === value.cartItem.count,

                tickets: {
                    $each: {
                        firstName: {
                            required,
                        },

                        lastName: {
                            required,
                        },

                        middleName: {
                            required,
                        },

                        phone: {
                            required,
                            minLength: minLength(12),
                        },

                        email: {
                            required,
                            email,
                        },
                    },
                },
            },
        },
    },

    data() {
        return {
            isCertificateEdit: false,
            certificateCode: null,
            customCertAmount: null,
            recipientIndexToChange: null,
            ticketIndexToChange: null,
            certPrices: [],
            isVisibleActivateCert: false,
            activateError: '',
            activateSuccess: '',
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(MODAL_MODULE, {
            isRecipientModalOpen: (state) =>
                state[MODALS][modalName.checkout.RECIPIENT_EDIT] &&
                state[MODALS][modalName.checkout.RECIPIENT_EDIT].open,
            isTicketModalOpen: (state) =>
                state[MODALS][modalName.checkout.TICKET_EDIT] && state[MODALS][modalName.checkout.TICKET_EDIT].open,
        }),

        ...mapGetters(CHECKOUT_MODULE, [
            PROFESSIONS_MAP,

            RECIPIENTS,
            SELECTED_RECIPIENT,

            PAYMENT_METHODS,
            SELECTED_PAYMENT_METHOD_ID,

            CONFIRMATION_TYPES,
            SELECTED_CONFIRMATION_TYPE_ID,

            PUBLIC_EVENTS,

            AGREEMENT,
            SUBSCRIBE,
            PROMO_CODE,

            MAX_CERTIFICATE_DISCOUNT,
            CERTIFICATE_PAYMENT,
            CERTIFICATE_STATUS,

            PROMOCODE_STATUS,
            TICKET_STATUS,
            CERTIFICATES,
        ]),

        ...mapState(CERTIFICATE_MODULE, [CERTIFICATE_TYPE, CERTIFICATE_DATA]),
        ...mapGetters(CERTIFICATE_MODULE, [RECEIVE_METHOD_STATUS, ACTIVE_CERTIFICATE_STATUS, ACTIVE_CERTIFICATES]),

        masterClasses() {
            const publicEvents = this[PUBLIC_EVENTS] || [];

            return publicEvents.map((i) => {
                const { p } = i.cartItem;
                const dateObj = getDate(`${p.nearestDate} ${p.nearestTimeFrom}`);
                const date = dateObj.toLocaleString(this[LOCALE], dayMonthLongDateSettings);
                const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const dateTime = `${date} (${this.$t(`weekdays.short.${dateObj.getDay()}`)}), ${time}`;
                const url = generateMasterclassUrl(p.code);
                const speaker = p.speakers && p.speakers[0];
                const author = speaker && `${speaker.firstName} ${speaker.lastName}, ${speaker.profession}`;

                const defaultImg = p.image && generatePictureSourcePath(144, 96, p.image.id);
                const desktopImg = p.image && {
                    webp: generatePictureSourcePath(144, 96, p.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(144, 96, p.image.id),
                };

                return {
                    ...i,
                    cartItem: {
                        ...i.cartItem,
                        p: {
                            ...p,
                            url,
                            author,
                            dateTime,
                            desktopImg,
                            defaultImg,
                        },
                    },
                };
            });
        },

        agreementError() {
            if (this.$v.agreement.$dirty && !this.$v.agreement.valid) {
                this.debounce_scrollToError(this.$refs.agreement);
                return 'Подтвердите согласие с условиями заказа и доставки';
            }
        },

        publicEventsError() {
            if (this.$v.publicEvents.$dirty && this.$v.publicEvents.$invalid) {
                this.debounce_scrollToError(this.$refs.events);
            }
        },

        isCertificatePending() {
            return this[CERTIFICATE_STATUS] === requestStatus.PENDING;
        },

        isCertAmountPending() {
            // isCertificatePending
            // TODO: CERTIFICATE_STATUS -> CERT_AMOUNT_STATUS
            return this[CERTIFICATE_STATUS] === requestStatus.PENDING;
        },

        // Общая сумма сертификатов
        availableCertAmount() {
            let am = this[ACTIVE_CERTIFICATES].map(c => c.balance)
            return am.length > 0 ? am.reduce((a, b) => a+b) : 0
        },

        // сертификаты, которые добавлены к оплате заказа
        cards() {
            return this[CERTIFICATES] ? this[CERTIFICATES] : []
        },

        // все активные сертификаты пользоватлея
        activeCards() {
            return this[ACTIVE_CERTIFICATES] ? this[ACTIVE_CERTIFICATES] : []
        },

        // Названия сертификатов через запятую
        aggCertNames() {
            let am = this.cards.map(c => c.code)
            return am.length > 0 ? am.join(', ') : ''
        },

        isСertAmountEdit() {
            return this.availableCertAmount > 0
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTicketPending() {
            return this[TICKET_STATUS] === requestStatus.PENDING;
        },

        isPaymentMethodPending() {
            return this[PAYMENT_METHOD_STATUS] === requestStatus.PENDING;
        },

        recipientError() {
            if (!this.$v.selectedRecipient.$dirty) {
                return null;
            }

            let message = '';

            if (!this.$v.selectedRecipient.required) {
                message = 'Пожалуйста, укажите получателя';
            } else {
                if (!this.$v.selectedRecipient.fio) {
                    message = 'Пожалуйста, укажите полностью ФИО';
                }

                if (!this.$v.selectedRecipient.nameRu) {
                    message = 'В имени должны быть только русские буквы, тире и пробелы';
                }

                if (!this.$v.selectedRecipient.hasName && !this.$v.selectedRecipient.hasEmail) {
                    message = 'Пожалуйста, добавьте фамилию и имя, email';
                } else {
                    if (!this.$v.selectedRecipient.hasName) {
                        message = 'Пожалуйста, добавьте фамилию и имя получателя';
                    }

                    if (!this.$v.selectedRecipient.hasEmail) {
                        message = 'Пожалуйста, добавьте email';
                    }
                }
            }

            if (message.length > 0) {
                return message;
            }

            return null;
        },
    },

    watch: {
        [SELECTED_RECIPIENT]: {
            immediate: true,
            handler() {
                if (
                    this[SELECTED_RECIPIENT] &&
                    typeof this[SELECTED_RECIPIENT].id !== 'undefined' &&
                    !this.$v[SELECTED_RECIPIENT].$invalid
                ) {
                    this.masterClasses.forEach((masterclass) => {
                        const { offerId, tickets } = masterclass;

                        if (tickets.length === 0) {
                            const fio = this[SELECTED_RECIPIENT].name.split(' ');

                            if (fio.length === 3) {
                                this.onSaveTicket({
                                    ticket: {
                                        id: this[SELECTED_RECIPIENT].id,
                                        firstName: fio[1],
                                        lastName: fio[0],
                                        middleName: fio[2],
                                        phone: this[SELECTED_RECIPIENT].phone,
                                        email: this[SELECTED_RECIPIENT].email,
                                        professionId: DEFAULT_TICKET_PROFESSIONAL_ID,
                                    },
                                    id: offerId,
                                });
                            }
                        }
                    });
                }
            },
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CHECKOUT_MODULE, [
            SET_RECIPIENT,
            ADD_RECIPIENT,
            CHANGE_RECIPIENT,

            ADD_TICKET,
            CHANGE_TICKET,

            SET_AGREEMENT,
            SET_SUBSCRIBE,
            SET_CONFIRMATION_TYPE,

            ADD_CERTIFICATE,

            ADD_PROMOCODE,
            DELETE_PROMOCODE,
            FETCH_CHECKOUT_DATA,
            PAYMENT_METHOD_STATUS,
            SET_PUBLIC_EVENT_PAYMENT_METHOD,
        ]),

        ...mapActions(CERTIFICATE_MODULE, [FETCH_CERTIFICATES, ACTIVATE_CERTIFICATE]),

        formatPhoneNumber(phone) {
            return formatPhoneNumber(phone);
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

        onAddTicket(id) {
            this[CHANGE_MODAL_STATE]({ name: modalName.checkout.TICKET_EDIT, open: true, state: { ticket: {}, id } });
        },

        onSaveTicket({ ticket, id }) {
            if (this.ticketIndexToChange !== null)
                this[CHANGE_TICKET]({ index: this.ticketIndexToChange, ticket, offerId: id });
            else this[ADD_TICKET]({ ticket, offerId: id });
        },

        onChangeTicket(ticket, id, index) {
            this.ticketIndexToChange = index;
            this[CHANGE_MODAL_STATE]({
                name: modalName.checkout.TICKET_EDIT,
                open: true,
                state: { ticket: { ...ticket }, id },
            });
        },

        onCloseTicketModal() {
            this.ticketIndexToChange = null;
        },

        onSetConfirmationType(value) {
            this[SET_CONFIRMATION_TYPE](value);
        },

        onSetAgreement(value) {
            this[SET_AGREEMENT](Number(value));
        },

        onSetPaymentMethod(method) {
            if (!method.is_available) {
                return;
            }

            this[SET_PUBLIC_EVENT_PAYMENT_METHOD](method);
        },

        scrollToError(element) {
            const panelScrollOffset = 24;
            window.scrollTo({ top: getPosition(element).y - panelScrollOffset, behavior: 'smooth' });
        },

        // async applyCertificate() {
        //     try {
        //         const response = await this.ADD_CERTIFICATE(200);
        //     } catch (error) {
        //         // todo
        //     }
        // },

        onActivateInput () {
            this.activateError = ''
            this.activateSuccess = ''
        },

        async fetchCards() {
            this.loading = true
            try {
                await this[FETCH_CERTIFICATES]()
                this.loading = false
            } catch (error) {
                this.loading = false
            }
        },

        async applyCertificate() {
            // TODO: не выводится сообщение об ошибке, например "Не указана сумма операции"
            if (this.customCertAmount == null) {
                this.customCertAmount = this.maxCertificateDiscount
            }
            try {
                await this.ADD_CERTIFICATE(this.customCertAmount || 0)
                this.isCertificateEdit = false
            } catch (error) {
                this.isCertificateEdit = true
            }
        },

        async activateCertificate() {
            if (!this.certificateCode || this.certificateCode.trim() === '') {
                return
            }
            try {
                this.$progress.start()
                await this[ACTIVATE_CERTIFICATE](this.certificateCode)
                let repl = this[CERTIFICATE_DATA]
                if (this[ACTIVE_CERTIFICATE_STATUS] == 'success') {
                    this.activateSuccess =
                        repl && repl.message ? repl.message : '' // Нужно решить, что вывести по умолчанию, если с сервера потлетел ответ с пустым сообщением
                } else {
                    this.activateError =
                        repl && repl.message ? repl.message : 'Произошла неизвестная ошибка'
                }
                this.$progress.finish()
                this.certificateCode = ''
            } catch (e) {
                const { status } = e;
                switch (status) {
                    case httpCodes.BAD_REQUEST:
                        this.activateError = e.data && e.data.message ? e.data.message : 'Не удалось активировать сертификат' // this.$t('validation.errors.promocodeInvalid');
                        break;
                    case httpCodes.NOT_FOUND:
                        this.activateError = e.data && e.data.message ? e.data.message : 'Не удалось активировать сертификат' // this.$t('validation.errors.promocodeNotExist');
                        break;
                }
                this.$progress.fail()
                this.$progress.finish() // finish после fail точно необходим?
            }
            setTimeout(() => {
                this.activateError = ''
                this.activateSuccess = ''
                this.isVisibleActivateCert = false
            }, 5000);

            try {
                await this[FETCH_CHECKOUT_DATA](cartItemTypes.MASTERCLASS);
            } catch (error) {
                console.error(error);
            }

            this.fetchCards();
        },

        onEditCertificate() {
            this.isCertificateEdit = true;
            // isСertAmountEdit
        },

        onToggleActivateCert() {
            this.isVisibleActivateCert = !this.isVisibleActivateCert;
        },

        validate() {
            this.$v.$touch();
            return !this.$v.$invalid;
        },
    },

    created() {
        this.agreementTypes = agreementTypes;
    },

    mounted() {
        this.debounce_scrollToError = _debounce(this.scrollToError, SCROLL_DEBOUNCE_TIME);
        this.fetchCards();
        this.customCertAmount = this.maxCertificateDiscount;
    },
};
</script>
