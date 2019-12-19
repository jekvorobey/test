<template>
    <general-modal class="details-modal" header="Реквизиты" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4>Реквизиты</h4>
            <form>
                <v-input>Наименование ИП</v-input>
                <v-input>Банк</v-input>
                <v-input>ИНН</v-input>
                <v-input>Корреспондентский счет банка</v-input>
                <v-input>Расчетный счет</v-input>
                <v-input>БИК</v-input>
                <v-input>Юридический адрес</v-input>
            </form>
        </template>
    </general-modal>
</template>
<script>
import VInput from '../../controls/VInput/VInput.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';
import validationMixin, { required } from '../../../plugins/validation';

import { mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';
import './DetailsModal.css';

export const NAME = 'details-modal';

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VInput,
        GeneralModal,
    },

    validations: {},

    data() {
        return {};
    },

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
