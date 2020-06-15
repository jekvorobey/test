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
            <v-button class="return-form__submit" @click="onSubmit">
                Оформить возврат
            </v-button>
            <v-button class="return-form__back-btn btn--transparent" @click="onBack">
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

import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as RETURN_MODULE, SELECTED_PRODUCTS } from '@store/modules/Profile/modules/ReturnPage';
import { SET_STEP } from '@store/modules/Profile/modules/ReturnPage/actions';

import { returnMethods, returnFormSteps } from '@enums/profile.js';
import './ReturnForm.css';

const RETURN_PAGE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

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
        ...mapActions(RETURN_PAGE_PATH, [SET_STEP]),

        onSetReturnMethod(methodId) {
            this.selectedReceiveMethodID = methodId;
        },

        onBack() {
            this[SET_STEP](returnFormSteps.DOCUMENTS);
        },

        onSubmit() {
            this[SET_STEP](returnFormSteps.RESULT);
        },
    },

    beforeMount() {
        this.receiveMethods = receiveMethods;
    },
};
</script>