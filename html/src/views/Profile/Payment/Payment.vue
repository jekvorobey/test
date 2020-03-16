<template>
    <section class="section payment-view">
        <h2 class="payment-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
        <!-- <info-panel class="payment-view__panel" header="Сохраненные карты">
            <template v-slot:controls>
                <v-link class="payment-view__panel-link" tag="button">
                    <v-svg name="plus-small" :width="iconSize" :height="iconSize" />
                    <span>&nbsp;&nbsp;Добавить карту</span>
                </v-link>
            </template>
            <div class="container container--tablet-lg">
                <ul class="payment-view__panel-list">
                    <checkout-option-card
                        class="payment-view__panel-item"
                        v-for="card in cards"
                        :key="card.type"
                        :selected="card.type === selectedCard.type"
                        @cardClick="onSetSelectedCard(card)"
                    >
                        <div class="payment-view__panel-item-type">
                            <v-svg :name="card.type" width="40" height="24" />
                            &nbsp;&nbsp;
                            {{ card.name }}
                        </div>
                        <div class="payment-view__panel-item-number">
                            {{ card.number && maskCardNumber(card.number) }}
                        </div>
                        <template v-slot:controls>
                            <div class="payment-view__panel-item-controls">
                                <v-link class="payment-view__panel-item-link" tag="button">
                                    <v-svg name="edit" width="16" height="16" />
                                </v-link>
                                <v-link class="payment-view__panel-item-link" tag="button">
                                    <v-svg name="cross" width="16" height="16" />
                                </v-link>
                            </div>
                        </template>
                    </checkout-option-card>
                </ul>
            </div>
        </info-panel> -->

        <info-panel class="payment-view__panel" header="Предпочтительный способ оплаты">
            <div class="container container--tablet-lg">
                <v-check
                    v-for="method in paymentMethods"
                    v-model="selectedMethod"
                    type="radio"
                    name="selectedMethod"
                    :key="method.id"
                    :value="method.id"
                    :id="`radio-${method.id}`"
                >
                    {{ method.name }}
                </v-check>
            </div>
        </info-panel>

        <div class="container payment-view__submit">
            <v-button class="payment-view__submit-btn" @click="onSave">
                Сохранить
            </v-button>
        </div>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VCheck from '@controls/VCheck/VCheck.vue';

import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import { mapActions, mapState } from 'vuex';
import { $store } from '@services/ServiceLocator';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { maskCardNumber } from '@util/helpers';
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';

import '@images/sprites/payment/visa.svg';
import '@images/sprites/payment/mastercard.svg';
import '@images/sprites/payment/mir.svg';
import '@images/sprites/edit.svg';
import '@images/sprites/cross.svg';
import '@images/sprites/plus-small.svg';
import './Payment.css';

export default {
    name: 'payment',

    components: {
        VSvg,
        VLink,
        VButton,
        VCheck,

        InfoPanel,
        CheckoutOptionCard,
    },

    data() {
        const selectedCard = {
            type: 'mastercard',
            name: 'MasterCard',
            number: '7878787867788515',
        };

        return {
            selectedCard,
            cards: [
                selectedCard,
                {
                    type: 'visa',
                    name: 'Visa',
                    number: '6788678864668515',
                },
                {
                    type: 'mir',
                    name: 'Мир',
                    number: '4674646746458515',
                },
            ],

            selectedMethod: 1,

            paymentMethods: [
                {
                    id: 1,
                    name: 'Картой онлайн',
                },
                {
                    id: 2,
                    name: 'Картой курьеру',
                },
                {
                    id: 3,
                    name: 'Наличными курьеру',
                },
                {
                    id: 4,
                    name: 'Яндекс.Деньги',
                },
            ],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {}),

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        maskCardNumber(number) {
            return maskCardNumber(number);
        },

        onSetSelectedCard(card) {
            this.selectedCard = card;
        },

        onChangeCard(card) {},

        onSave() {},
    },
};
</script>
