<template>
    <general-modal v-if="isOpen" class="checkout-date-modal" @close="onClose">
        <template v-slot:content>
            <h3 class="checkout-date-modal__hl">Дата доставки</h3>
            <v-datepicker
                class="checkout-date-modal__datepicker"
                mode="single"
                v-model="selectedDate"
                :enable="availableDates"
                :locale="locale"
                :maxDate="maxDate"
                :minDate="minDate"
                inline
            />
            <div class="checkout-date-modal__submit">
                <v-button @click="onChanged">Подтвердить доставку</v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '../../controls/VButton/VButton.vue';
import VDatepicker from '../../controls/VDatepicker/VDatepicker.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as CHECKOUT_MODULE } from '../../../store/modules/Checkout';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import './CheckoutDateModal.css';

export const NAME = 'checkout-date-modal';

export default {
    name: NAME,

    components: {
        VButton,
        VDatepicker,
        GeneralModal,
    },

    data() {
        return {
            selectedDate: null,
            availableDates: [],
        };
    },

    computed: {
        ...mapState(['locale']),
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
            state: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        maxDate() {
            return this.availableDates.length > 0 ? this.availableDates[this.availableDates.length - 1] : null;
        },

        minDate() {
            return this.availableDates.length > 0 ? this.availableDates[0] : null;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSelectPoint(point) {
            this.onClose();
        },

        onChanged() {
            this.$emit('changed', { ...this.state, selectedDate: this.selectedDate });
            this.onClose();
        },

        onClose() {
            this.$emit('close');
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },
    },

    watch: {
        state(value) {
            this.availableDates = this.state.availableDates;
            this.selectedDate = this.state.selectedDate;
        },
    },

    created() {
        this.availableDates = this.state.availableDates || [];
        this.selectedDate = this.state.selectedDate || [];
    },
};
</script>
