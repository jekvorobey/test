<template>
    <general-modal type="sm" class="notification-modal" :header="title" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="notification-modal__body">
                <h3 v-if="!isTablet" class="notification-modal__hl">{{ title }}</h3>
                <p class="notification-modal__message">{{ message }}</p>
                <v-button class="notification-modal__btn" @click="onClose">{{ btnText }}</v-button>
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

import './NotificationModal.css';

export const NAME = 'notification-modal';

export default {
    name: NAME,

    components: {
        VButton,
        GeneralModal,
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        title() {
            return this.modalState.title || 'Уведомление';
        },

        message() {
            return this.modalState.message || '';
        },

        btnText() {
            return this.modalState.btnMessage || 'Закрыть';
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this.$emit('close');
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },
    },
};
</script>
