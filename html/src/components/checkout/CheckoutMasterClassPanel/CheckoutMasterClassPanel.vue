<template>
    <div class="checkout-master-class-panel">
        <div class="checkout-master-class-panel__item checkout-master-class-panel__item--recepient">
            <div class="checkout-master-class-panel__item-header">
                <h2 class="checkout-master-class-panel__item-header-hl">Получатель</h2>
            </div>

            <ul class="checkout-master-class-panel__item-list">
                <checkout-option-card
                    class="checkout-master-class-panel__item-card"
                    v-for="(recipient, index) in recipients"
                    :key="recipient.id"
                    :selected="selectedRecipient && isEqualObject(recipient, selectedRecipient)"
                    :show-check="recipients.length > 1"
                    @cardClick="onSetRecipient(recipient)"
                    @btnClick="onChangeRecipient(recipient, index)"
                >
                    <p>{{ recipient.name }}</p>
                    <p>{{ recipient.email }}</p>
                    <p>{{ recipient.phone }}</p>
                </checkout-option-card>
            </ul>

            <attention-panel class="checkout-master-class-panel__attention">
                На указанный адрес электронной почты мы вышлем вам копии билетов
            </attention-panel>

            <v-link class="checkout-master-class-panel__item-header-link" tag="button" @click="onAddRecipient">
                <v-svg name="plus" width="24" height="24" />&nbsp;Добавить нового получателя
            </v-link>
        </div>

        <div class="checkout-master-class-panel__item">
            <div class="checkout-master-class-panel__item-header" ref="events">
                <h2 class="checkout-master-class-panel__item-header-hl">
                    Участники&nbsp;<v-spinner width="24" height="24" :show="false" />
                </h2>
            </div>

            <div v-for="({ cartItem: { p: product, count }, tickets, id }, index) in masterClasses" :key="id">
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

                <ul class="checkout-master-class-panel__item-list">
                    <checkout-option-card
                        class="checkout-master-class-panel__item-card"
                        v-for="(ticket, index) in tickets"
                        :key="ticket.id"
                        :show-check="false"
                        selected
                        @btnClick="onChangeTicket(ticket, id, index)"
                    >
                        <p class="text-bold">Билет {{ index + 1 }}</p>
                        <p>{{ ticket.firstName }} {{ ticket.lastName }}</p>
                        <p>{{ ticket.phone }}</p>
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
                        <p class="text-bold">Билет {{ tickets.length + 1 }}</p>
                        <br />
                        <button
                            class="checkout-master-class-panel__item-card-link text-grey"
                            :class="{
                                'status-color-error':
                                    $v.publicEvents.$anyDirty && !$v.publicEvents.$each.$iter[index].isFull,
                            }"
                            @click="onAddTicket(id)"
                        >
                            Добавить данные участника
                        </button>
                        <br />
                        <br />
                    </checkout-option-card>
                </ul>
            </div>
        </div>

        <div class="checkout-master-class-panel__item checkout-master-class-panel__item--payment">
            <div class="checkout-master-class-panel__item-header">
                <h2 class="checkout-master-class-panel__item-header-hl">Способ оплаты</h2>
            </div>

            <ul class="checkout-master-class-panel__item-list">
                <checkout-option-card
                    class="checkout-master-class-panel__item-card"
                    v-for="method in paymentMethods"
                    :key="method.id"
                    :selected="method.id === selectedPaymentMethodID"
                    readonly
                >
                    <div class="checkout-master-class-panel__item-payment" v-if="method.type === 'card'">
                        <div class="text-bold checkout-master-class-panel__item-payment-title">
                            {{ method.title }}
                        </div>
                        <div class="checkout-master-class-panel__item-payment-list">
                            <v-svg name="visa" width="40" height="24" />
                            <v-svg name="mastercard" width="40" height="24" />
                            <v-svg name="mir" width="40" height="24" />
                            <v-svg name="apple" width="40" height="24" />
                            <v-svg name="google" width="40" height="24" />
                            <v-svg name="yandex" width="56" height="24" />
                        </div>
                    </div>
                    <p class="text-bold" v-else>{{ method.title }}</p>
                </checkout-option-card>
            </ul>

            <div
                class="checkout-master-class-panel__item checkout-master-class-panel__item checkout-master-class-panel__item--child checkout-master-class-panel__item--settings"
            >
                <div class="checkout-master-class-panel__item-panel" ref="agreement">
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

                <div class="checkout-master-class-panel__item-panel">
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

        <transition name="fade">
            <checkout-recipient-modal
                v-if="$isServer || isRecipientModalOpen"
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

import { NAME as CHECKOUT_MODULE, CHECKOUT_STATUS } from '@store/modules/Checkout';
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
    PUBLIC_EVENTS,
} from '@store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import _isEqual from 'lodash/isEqual';
import _debounce from 'lodash/debounce';

import { SCROLL_DEBOUNCE_TIME } from '@constants';
import { requestStatus, agreementTypes, fileExtension, modalName } from '@enums';
import { getPosition } from '@util';
import { generateMasterclassUrl } from '@util/catalog';
import { generatePictureSourcePath } from '@util/file';
import { dayMonthLongDateSettings, hourMinuteTimeSettings } from '@settings';
import validationMixin, { required, minLength, email } from '@plugins/validation';

import '@images/sprites/payment/bonus.svg';
import '@images/sprites/payment/visa.svg';
import '@images/sprites/payment/mastercard.svg';
import '@images/sprites/payment/mir.svg';
import '@images/sprites/payment/apple.svg';
import '@images/sprites/payment/google.svg';
import '@images/sprites/payment/yandex.svg';
import '@images/sprites/plus.svg';
import './CheckoutMasterClassPanel.css';

import profileMasterClassImg1 from '@images/mock/profileMasterClass1.png';

export default {
    name: 'checkout-master-class-panel',
    mixins: [validationMixin],

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
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
            valid: value => value === true,
        },

        [SELECTED_RECIPIENT]: {
            required,
        },

        [PUBLIC_EVENTS]: {
            $each: {
                isFull: value => value.tickets.length === value.cartItem.count,

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
            recipientIndexToChange: null,
            ticketIndexToChange: null,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(MODAL_MODULE, {
            isRecipientModalOpen: state =>
                state[MODALS][modalName.checkout.RECIPIENT_EDIT] &&
                state[MODALS][modalName.checkout.RECIPIENT_EDIT].open,
            isTicketModalOpen: state =>
                state[MODALS][modalName.checkout.TICKET_EDIT] && state[MODALS][modalName.checkout.TICKET_EDIT].open,
        }),

        ...mapGetters(CHECKOUT_MODULE, [
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

            PROMOCODE_STATUS,
        ]),

        masterClasses() {
            const publicEvents = this[PUBLIC_EVENTS] || [];

            return this.publicEvents.map(i => {
                const p = i.cartItem.p;
                const dateObj = new Date(`${p.nearestDate} ${p.nearestTimeFrom}`);
                const date = dateObj.toLocaleString(this[LOCALE], dayMonthLongDateSettings);
                const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const dateTime = `${date}, ${time}`;
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

        isTablet() {
            return this.$mq.tablet;
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

            ADD_PROMOCODE,
            DELETE_PROMOCODE,
        ]),

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
            if (this.ticketIndexToChange !== null) this[CHANGE_TICKET]({ index: this.ticketIndexToChange, ticket, id });
            else this[ADD_TICKET]({ ticket, id });
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

        scrollToError(element) {
            const panelScrollOffset = 24;
            window.scrollTo({ top: getPosition(element).y - panelScrollOffset, behavior: 'smooth' });
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
    },
};
</script>
