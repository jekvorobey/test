<template>
    <general-modal class="message-modal" type="sm" header="Новое сообщение" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4 class="message-modal__hl">Новое сообщение</h4>
            <form class="message-modal__form">
                <v-input class="message-modal__form-row" v-model="subject" placeholder="Введите тему">
                    Тема
                </v-input>

                <v-input
                    v-model="message"
                    class="message-modal__form-row message-modal__form-textarea"
                    tag="textarea"
                    placeholder="Текст сообщения"
                    :rows="3"
                    :auto-height="false"
                >
                    Сообщение
                </v-input>

                <v-button class="message-modal__submit-btn" @click="onClose">
                    Добавить получателя
                </v-button>
            </form>
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
import './MessageModal.css';

export const NAME = 'message-modal';

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        GeneralModal,
    },

    data() {
        return {
            subject: '',
            message: '',
        };
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
