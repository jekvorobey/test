<template>
    <pin-modal :class="classes" @close="onClose">
        <div class="snack-notification-modal__inner">
            <template v-if="typeof message === 'string'">
                <div class="snack-notification-modal__message">{{ message }}</div>
            </template>
            <template v-else>
                <component :is="message" />
            </template>
        </div>
    </pin-modal>
</template>

<script>
import PinModal from '@components/PinModal/PinModal.vue';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { mapActions, mapState } from 'vuex';
import { MODALS, NAME as MODAL_MODULE } from '@store/modules/Modal';
import { modalName } from '@enums';

import './SnackNotificationModal.css';

export const SNACK_NOTIFICATION_TYPE = Object.freeze({
    INFO: 'info',
    ERROR: 'error',
    SUCCESS: 'success',
});

const NAME = modalName.general.SNACK_NOTIFICATION;

export default {
    name: 'snack-notify-modal',

    components: {
        PinModal,
    },

    data() {
        return {
            timeout: null,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        type() {
            return this.modalState.type || SNACK_NOTIFICATION_TYPE.INFO;
        },

        message() {
            return this.modalState.message || '';
        },

        closeTimeout() {
            return this.modalState.closeTimeout || 3000;
        },

        classes() {
            const classes = ['snack-notification-modal'];

            classes.push(`snack-notification-modal--${this.type}`);

            return classes;
        },
    },

    mounted() {
        if (this.closeTimeout > 0) {
            this.timeout = setTimeout(() => {
                this.onClose();
            }, this.closeTimeout);
        }
    },

    beforeDestroy() {
        clearTimeout(this.timeout);
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false, state: null });
        },
    },
};
</script>
