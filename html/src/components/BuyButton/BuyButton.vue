<template>
    <v-button v-on="handlers">
        <slot />
    </v-button>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY, STATUS } from '@store/modules/Auth';

import { modalName, authMode } from '@enums';
import { userStatus } from '@enums/profile';

export default {
    name: 'buy-button',

    components: {
        VButton,
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
            [STATUS]: (state) => (state[USER] && state[USER][STATUS]) || false, 
        }),

        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => (handlers[k] = (e) => this.$emit(k, e)));
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
                this[CHANGE_MODAL_STATE]({ name: modalName.general.AUTH, open: true, state: {
                    activeTab: authMode.LOGIN,
                }});
                return false;
            }

            const canBuy = this[CAN_BUY];
            if (!canBuy) {
                if (this[STATUS] === userStatus.CREATED || this[STATUS === userStatus.NEW]) {
                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.NOTIFICATION,
                        open: true,
                        state: {
                            title: 'Уведомление',
                            message: 'Ваш профессиональный статус не подтвержден. Заполните недостающую информацию в Личном кабинете.',
                            btnMessage: 'Подтвердить',
                            href: '/profile',
                        },
                    });
                } else {
                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.NOTIFICATION,
                        open: true,
                        state: {
                            title: 'Уведомление',
                            message: 'Статус вашего профиля не подтверждён',
                        },
                    });
                }
                return false;
            }
            return hasSession && canBuy;
        },
    },
};
</script>
