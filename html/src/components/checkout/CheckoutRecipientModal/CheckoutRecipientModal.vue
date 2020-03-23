<template>
    <general-modal v-if="isOpen" class="checkout-recipient-modal" @close="onClose">
        <template v-slot:content>
            <h3 class="checkout-recipient-modal__hl">Дата доставки</h3>

            <div class="checkout-recipient-modal__submit">
                <v-button @click="onChanged">Подтвердить доставку</v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import './CheckoutDateModal.css';

export const NAME = 'checkout-recipient-modal';

export default {
    name: NAME,

    components: {
        VButton,
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
