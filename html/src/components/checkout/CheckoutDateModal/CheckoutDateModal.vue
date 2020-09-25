<template>
    <general-modal
        v-if="isOpen"
        class="checkout-date-modal"
        @close="onClose"
        header="Дата и время доставки"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <h3 class="checkout-date-modal__hl">Дата и время доставки</h3>
            <div class="container checkout-date-modal__datepicker">
                <v-datepicker
                    mode="single"
                    v-model="selectedDate"
                    :enable="availableDates"
                    :locale="datepickerLocale"
                    :maxDate="maxDate"
                    :minDate="minDate"
                    month-selector-type="static"
                    date-format="Y-m-d"
                    inline
                />
            </div>
            <div class="container checkout-date-modal__select" v-if="timeSlots && timeSlots.length > 0">
                <p class="checkout-date-modal__select-title">Время доставки</p>
                <v-select
                    v-model="selectedTime"
                    placeholder="Выберите время"
                    track-by="code"
                    deselectLabel=""
                    :options="timeSlots"
                    :allow-empty="false"
                    :searchable="false"
                >
                    <template v-slot:singleLabel="{ option }">
                        <span>С {{ option.from }} до {{ option.to }}</span>
                    </template>
                    <template v-slot:option="{ option }">
                        <span>С {{ option.from }} до {{ option.to }}</span>
                    </template>
                </v-select>
            </div>
            <div class="checkout-date-modal__submit">
                <v-button class="checkout-date-modal__submit-btn" @click="onChanged">
                    Подтвердить доставку
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VDatepicker from '@controls/VDatepicker/VDatepicker.vue';
import VSelect from '@controls/VSelect/VSelect.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { LOCALE, LOCALIZATIONS } from '@store';
import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName } from '@enums';
import './CheckoutDateModal.css';

const NAME = modalName.checkout.DATE_EDIT;

export default {
    name: NAME,

    components: {
        VButton,
        VDatepicker,
        GeneralModal,
        VSelect,
    },

    data() {
        return {
            selectedDate: null,
            selectedTime: null,
            availableDates: [],
            availableDateTimes: {},
        };
    },

    computed: {
        ...mapState({
            datepickerLocale: (state) =>
                state[LOCALIZATIONS][state[LOCALE]] && state[LOCALIZATIONS][state[LOCALE]].flatpickrLocale,
        }),
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            state: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        maxDate() {
            return this.availableDates.length > 0 ? this.availableDates[this.availableDates.length - 1] : null;
        },

        minDate() {
            return this.availableDates.length > 0 ? this.availableDates[0] : null;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        timeSlots() {
            const selectedDate = this.selectedDate && this.selectedDate[0];
            return (this.availableDateTimes && this.availableDateTimes[selectedDate]) || [];
        },
    },

    watch: {
        state(value) {
            if (value) {
                this.availableDates = value.availableDates || [];
                this.availableDateTimes = value.availableDateTimes || {};
                this.selectedDate = value.selectedDate;
                this.selectedTime = value.selectedTime;
            }
        },

        timeSlots(value) {
            this.selectedTime = value && value[0];
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSelectPoint(point) {
            this.onClose();
        },

        onChanged() {
            const { selectedDate, selectedTime } = this;

            this.$emit('changed', {
                ...this.state,
                selectedTime,
                selectedDate: selectedDate[0],
            });
            this.onClose();
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    created() {
        const { availableDates, availableDateTimes, selectedDate, selectedTime } = this.state;

        this.availableDates = availableDates || [];
        this.availableDateTimes = availableDateTimes || {};
        this.selectedDate = selectedDate || [];
        this.selectedTime = selectedTime || null;
    },
};
</script>
