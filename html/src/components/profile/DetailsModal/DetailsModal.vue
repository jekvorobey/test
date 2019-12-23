<template>
    <general-modal class="details-modal" header="Реквизиты" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4 class="details-modal__hl">Реквизиты</h4>
            <form class="details-modal__form">
                <div class="details-modal__form-row">
                    <v-input class="details-modal__form-column">Наименование ИП</v-input>
                    <v-input class="details-modal__form-column">Банк</v-input>
                </div>

                <div class="details-modal__form-row">
                    <v-input class="details-modal__form-column">ИНН</v-input>
                    <v-input class="details-modal__form-column">Корреспондентский счет банка</v-input>
                </div>

                <div class="details-modal__form-row">
                    <div class="details-modal__form-column">
                        <v-input>Расчетный счет</v-input>
                        <v-input>БИК</v-input>
                    </div>
                    <div class="details-modal__form-column">
                        <v-input class="details-modal__form-textarea" tag="textarea" :auto-height="isTablet">
                            Юридический адрес
                        </v-input>
                    </div>
                </div>
            </form>
            <div class="details-modal__submit">
                <v-button class="details-modal__submit-btn" @click="onClose">
                    Сохранить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '../../controls/VButton/VButton.vue';
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
        VButton,
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
