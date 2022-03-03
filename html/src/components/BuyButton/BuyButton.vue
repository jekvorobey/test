<template>
    <v-button :disabled="disabled" :loading="loading" v-on="handlers">
        <slot />
    </v-button>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import { $store } from '@services';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY, STATUS } from '@store/modules/Auth';

import { modalName, authMode } from '@enums';
import { userStatus } from '@enums/profile';

export const checkSession = () => {
    const hasSession = $store.state[AUTH_MODULE][HAS_SESSION];
    if (!hasSession) {
        $store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
            name: modalName.general.AUTH,
            open: true,
            state: {
                activeTab: authMode.LOGIN,
            },
        });
        return false;
    }
    return true;
};

export const checkPermissions = (freeBuy) => {
    // if (!checkSession()) {
    //     return false;
    // }

    const user = $store.state[AUTH_MODULE][USER];
    const canBuy = user && user[CAN_BUY];
    const status = user && user[STATUS];
    if (!canBuy) {
        if (status === userStatus.CREATED || status === userStatus.NEW) {
            $store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    title: 'Уведомление',
                    message:
                        'Ваш профессиональный статус не подтвержден. Заполните недостающую информацию в Личном кабинете.',
                    btnMessage: 'Заполнить',
                    href: '/profile',
                },
            });
        } else {
            $store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
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
    return true;
};

export default {
    name: 'buy-button',

    components: {
        VButton,
    },

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => (handlers[k] = (e) => this.$emit(k, e)));
            handlers.click = this.onBtnClick;
            return handlers;
        },
    },

    methods: {
        onBtnClick(e) {
            e.preventDefault();
            e.stopPropagation();
            if (checkPermissions()) this.$emit('click', e);
        },
    },
};
</script>
