<template>
    <div class="return-form">
        <div class="return-form__header">
            <h3 class="return-form__header-title">
                Выберите способ возврата
            </h3>
            <ul class="return-form__list">
                <checkout-option-card
                    class="return-form__list-item"
                    v-for="method in receiveMethods"
                    :key="method.id"
                    :selected="method.id === selectedReceiveMethodID"
                    readonly
                    @cardClick="onSetReturnMethod(method.id)"
                >
                    <p class="text-bold">{{ method.title }}</p>
                    <p class="text-grey text-sm">{{ method.description }}</p>
                </checkout-option-card>
            </ul>
        </div>
        <component :is="selectedReturnMethod" />
        <div class="return-form__controls">
            <v-button class="return-form__submit">
                Оформить возврат
            </v-button>
            <v-button class="return-form__back-btn btn--transparent">
                Назад
            </v-button>
        </div>
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';
import ReturnCourierForm from './ReturnCourierForm.vue';
import ReturnOutpostForm from './ReturnOutpostForm.vue';
import ReturnPostForm from './ReturnPostForm.vue';

import { returnMethods } from '@enums/profile.js';

import './ReturnForm.css';

const receiveMethods = [
    {
        id: 1,
        title: 'Курьеру',
        description: 'Общий вес товаров более 5 кг',
    },
    {
        id: 2,
        title: 'В пункт выдачи заказов',
    },
    {
        id: 3,
        title: 'В постамат',
    },
];

export default {
    name: 'return-form',

    components: {
        VButton,

        CheckoutOptionCard,
    },

    data() {
        return {
            selectedReceiveMethodID: 1,
        };
    },

    computed: {
        selectedReturnMethod() {
            switch (this.selectedReceiveMethodID) {
                case returnMethods.COURIER:
                    return ReturnCourierForm;
                case returnMethods.OUTPOST:
                    return ReturnOutpostForm;
                case returnMethods.POST:
                    return ReturnPostForm;
                default:
                    return null;
            }
        },
    },

    methods: {
        onSetReturnMethod(methodId) {
            this.selectedReceiveMethodID = methodId;
        },
    },

    beforeMount() {
        this.receiveMethods = receiveMethods;
    },
};
</script>