<template>
    <general-modal type="sm" class="confirmation-modal" :header="title" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="confirmation-modal__body">
                <h3 v-if="!isTablet" class="confirmation-modal__hl">{{ title }}</h3>
                <p class="confirmation-modal__message">{{ message }}</p>
                <div class="confirmation-modal__controls">
                    <v-button class="confirmation-modal__btn-cancel" @click="onClose">{{ btnCancelText }}</v-button>
                    <v-button class="btn--transparent confirmation-modal__btn-submit" @click="onSubmit">
                        <span class="confirmation-modal__btn-text">{{ btnSubmitText }}</span>
                    </v-button>
                </div>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName } from '@enums';
import './ConfirmationModal.css';

const NAME = modalName.profile.CONFIRMATION;

export default {
    name: NAME,

    components: {
        VButton,
        GeneralModal,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        title() {
            return this.modalState.title || 'Подтвердить?';
        },

        message() {
            return this.modalState.message || 'Подтвердите действие';
        },

        btnCancelText() {
            return this.modalState.btnCancelText || 'Отменить';
        },

        btnSubmitText() {
            return this.modalState.btnSubmitText || 'Подтвердить';
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        onSubmit() {
            const { additionalArgs } = this.modalState;
            this.$emit('submit', additionalArgs);
            this.onClose();
        },
    },
};
</script>
