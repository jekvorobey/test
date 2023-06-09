<template>
    <general-modal type="sm" class="notification-modal" :header="title" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="notification-modal__body">
                <h4 v-if="!isTablet" class="notification-modal__hl">{{ title }}</h4>
                <p class="notification-modal__message">{{ message }}</p>
                <div class="notification-modal__actions">
                    <v-button class="notification-modal__btn" @click="onClose">{{ btnText }}</v-button>
                    <v-button v-if="bundle" class="notification-modal__btn" to="/cart">Перейти в корзину</v-button>
                    <v-button v-if="altBtn" class="notification-modal__btn" :to="altBtn.action">{{
                        altBtn.message
                    }}</v-button>
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

import {eventName, modalName} from '@enums';
import './NotificationModal.css';

const NAME = modalName.general.NOTIFICATION;

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
            return this.modalState.title || 'Уведомление';
        },

        message() {
            return this.modalState.message || '';
        },

        bundle() {
            return this.modalState.bundle || false;
        },

        btnText() {
            return this.modalState.btnMessage || 'Закрыть';
        },

        altBtn() {
            return this.modalState.altBtn || null;
        },

        href() {
            return this.modalState.href;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            if (this.href) this.$router.push(this.href);

            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeDestroy() {
       this.onClose()
    },
};
</script>
