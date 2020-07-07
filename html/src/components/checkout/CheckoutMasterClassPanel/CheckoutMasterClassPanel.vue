<template>
    <div class="checkout-master-class-panel">
        <div class="checkout-master-class-panel__item checkout-master-class-panel__item--recepient">
            <div class="checkout-master-class-panel__item-header">
                <h2 class="checkout-master-class-panel__item-header-hl">Получатель</h2>
            </div>

            <ul class="checkout-master-class-panel__item-list">
                <checkout-option-card
                    class="checkout-master-class-panel__item-card"
                    v-for="recipient in recipients"
                    :key="recipient.id"
                    @cardClick="SET_RECIPIENT(recipient)"
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
            <div class="checkout-master-class-panel__item-header">
                <h2 class="checkout-master-class-panel__item-header-hl">
                    Участники&nbsp;<v-spinner width="24" height="24" :show="false" />
                </h2>
            </div>

            <master-class-card
                class="checkout-master-class-panel__item-masterclass"
                v-bind="masterclass"
                :is-small="isTablet"
            />

            <ul class="checkout-master-class-panel__item-list">
                <checkout-option-card
                    class="checkout-master-class-panel__item-card"
                    v-for="(ticket, index) in tickets"
                    :key="ticket.id"
                    :readonly="!ticket.info"
                >
                    <p class="text-bold">Билет {{ index + 1 }}</p>
                    <template v-if="ticket.info">
                        <p>{{ ticket.info.firstName }} {{ ticket.info.lastName }}</p>
                        <p class="text-grey">{{ ticket.info.profile }}</p>
                        <p>{{ ticket.info.phone }}</p>
                        <p>{{ ticket.info.email }}</p>
                    </template>
                    <template v-else>
                        <br />
                        <button>Добавить данные участника</button>
                        <br />
                        <br />
                    </template>
                </checkout-option-card>
            </ul>
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
                    <p class="text-bold">{{ method.title }}</p>
                    <br />
                    <div class="checkout-master-class-panel__item-payment" v-if="method.type === 'card'">
                        <v-svg name="visa" width="40" height="24" />
                        <v-svg name="mastercard" width="40" height="24" />
                        <v-svg name="mir" width="40" height="24" />
                        <v-svg name="apple" width="40" height="24" />
                        <v-svg name="google" width="40" height="24" />
                        <v-svg name="yandex" width="56" height="24" />
                    </div>
                </checkout-option-card>
            </ul>

            <div
                class="checkout-master-class-panel__item checkout-master-class-panel__item checkout-master-class-panel__item--child checkout-master-class-panel__item--settings"
            >
                <div class="checkout-master-class-panel__item-panel">
                    <v-check
                        id="check-promo"
                        :checked="subscribe"
                        class="checkout-master-class-panel__item-panel-check"
                        name="promo"
                        @change="SET_SUBSCRIBE(Number($event))"
                    >
                        Сообщать мне об акциях, скидках и специальных предложениях
                    </v-check>
                    <v-check
                        id="check-agreement"
                        :checked="agreement"
                        class="checkout-master-class-panel__item-panel-check"
                        name="agreement"
                        @change="SET_AGREEMENT(Number($event))"
                    >
                        Я согласен с <router-link :to="{name: 'Agreements', params: {type: 'public-offer'}}" target="_blank">условиями оферты</router-link> и
                        <router-link :to="{name: 'Agreements', params: {type: 'personal-policy'}}" target="_blank">политикой конфиденциальности</router-link>
                    </v-check>
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
                        @change="SET_CONFIRMATION_TYPE($event)"
                    >
                        {{ confirmation.title }}
                    </v-check>
                </div>
            </div>
        </div>

        <transition name="fade"> </transition>
    </div>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VInput from '@controls/VInput/VInput.vue';
import VButton from '@controls/VButton/VButton.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import MasterClassCard from '@components/MasterClassCard/MasterClassCard.vue';
import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

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
} from '@store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import { orderBy as _orderBy } from 'lodash/collection';

import { requestStatus } from '@enums';

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
    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VCheck,
        VSpinner,

        MasterClassCard,
        CheckoutOptionCard,
        AttentionPanel,
    },

    data() {
        return {
            masterclass: {
                name: 'Свадебный стилист',
                date: '3 сентября (пт), 12:00',
                address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                image: profileMasterClassImg1,
                price: {
                    value: 5000,
                    currency: 'RUB',
                },
            },

            tickets: [
                {
                    id: 1,
                    info: {
                        firstName: 'Александра',
                        lastName: 'Александровская',
                        profile: 'стилист-визажист',
                        phone: '+7 905 123-45-67',
                        email: 'lukashin@gmail.com',
                    },
                },

                {
                    id: 2,
                    info: {
                        firstName: 'Динис',
                        lastName: 'Базгутдинов',
                        profile: 'дизайнер',
                        phone: '+7 916 123-45-67',
                        email: 'veryverylongemailever-2020@gmail.com',
                    },
                },
                {
                    id: 3,
                    info: null,
                },
            ],
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState(MODAL_MODULE, {}),

        ...mapGetters(CHECKOUT_MODULE, [
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
        ]),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(CHECKOUT_MODULE, [
            SET_RECIPIENT,

            SET_AGREEMENT,
            SET_SUBSCRIBE,
            SET_CONFIRMATION_TYPE,

            ADD_PROMOCODE,
            DELETE_PROMOCODE,
        ]),

        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onAddRecipient() {
            this[CHANGE_MODAL_STATE]({ name: 'checkout-recipient-modal', open: true });
        },
    },
};
</script>
