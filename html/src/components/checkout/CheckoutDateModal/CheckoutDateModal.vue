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
                    date-format="Y-m-d"
                    inline
                />
            </div>
            <div class="container checkout-date-modal__select" v-if="timeSlots.length">
                <p class="checkout-date-modal__select-title">Время доставки</p>
                <v-select
                    v-model="slotTime"
                    :searchable="false"
                    placeholder="Выберите время"
                    label="name"
                    track-by="value"
                    deselectLabel=""
                    :allow-empty="false"
                    :options="timeSlots"
                ></v-select>
            </div>
            <div class="checkout-date-modal__submit">
                <v-button class="checkout-date-modal__submit-btn" @click="onChanged">Подтвердить доставку</v-button>
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
            availableDateTimes: {},
            slotTime: {
                result: {},
            },
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

        availableDates() {
            return Object.keys(this.availableDateTimes);
        },

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
            const slotDate = this.selectedDate && this.selectedDate[0];
            const times = slotDate && this.availableDateTimes && this.availableDateTimes[slotDate];

            if (slotDate && times) {
                return times.map(({ from, to, code }, key) => {
                    return {
                        name: `С ${from}:00 до ${to}:00`,
                        value: code,
                        result: { deliveryTimeStart: from, deliveryTimeEnd: to, deliveryTimeCode: code },
                    };
                });
            }
            return [];
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSelectPoint(point) {
            this.onClose();
        },

        onChanged() {
            this.$emit('changed', {
                ...this.state,
                ...this.slotTime.result,
                selectedDate: this.selectedDate,
            });
            this.onClose();
        },

        onClose() {
            this.$emit('close');
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },
    },

    watch: {
        state(value) {
            this.availableDateTimes = this.state.availableDateTimes;
            this.selectedDate = this.state.selectedDate;
        },
        timeSlots(value) {
            if (value && value[0]) this.slotTime = value[0];
        },
    },

    created() {
        const options = { month: 'numeric', day: 'numeric', year: 'numeric' };

        this.availableDateTimes = this.state.availableDateTimes || {};
        this.selectedDate = this.state.selectedDate || [];

        if (this.selectedDate.length && this.selectedDate[0].getMonth) {
            this.selectedDate[0] = this.selectedDate[0]
                .toLocaleDateString(this[LOCALE], options)
                .split('.')
                .reverse()
                .join('-');
        }
    },
};
</script>
