<template>
    <v-button v-on="handlers">
        <slot />
    </v-button>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import { NAME as LOGIN_MODAL_NAME } from '@components/LoginModal/LoginModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY } from '@store/modules/Auth';

export default {
    name: 'buy-button',

    components: {
        VButton,
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: state => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach(k => (handlers[k] = e => this.$emit(k, e)));
            handlers.click = this.onBtnClick;
            return handlers;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onBtnClick(e) {
            e.stopPropagation();
            if (this.checkPermissions()) this.$emit('click', e);
        },

        checkPermissions() {
            const hasSession = this[HAS_SESSION];
            if (!hasSession) {
                this[CHANGE_MODAL_STATE]({ name: LOGIN_MODAL_NAME, open: true });
                return false;
            }

            const canBuy = this[CAN_BUY];
            if (!canBuy) {
                alert('Статус вашего профиля не подтвержден');
                return false;
            }
            return hasSession && canBuy;
        },
    },
};
</script>
