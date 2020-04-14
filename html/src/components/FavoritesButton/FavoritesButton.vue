<template>
    <v-link tag="button" v-on="handlers">
        <v-svg name="wishlist-full" width="18" height="20" v-if="isActive" />
        <v-svg name="wishlist-middle" width="18" height="20" v-else />
    </v-link>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VSvg from '@controls/VSvg/VSvg.vue';

import { NAME as LOGIN_MODAL_NAME } from '@components/LoginModal/LoginModal.vue';
import { NAME as NOTIFICATION_MODAL_NAME } from '@components/NotificationModal/NotificationModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY } from '@store/modules/Auth';

import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/wishlist-full.svg';

import './FavoritesButton.css';

export default {
    name: 'favorites-button',

    components: {
        VLink,
        VSvg,
    },

    props: {
        isActive: {
            type: Boolean,
            default: false,
        }
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
                this[CHANGE_MODAL_STATE]({ name: NOTIFICATION_MODAL_NAME, open: true, state: {
                    title: 'Уведомление',
                    message: 'Статус вашего профиля не подтверждён'
                }});
                return false;
            }
            return hasSession && canBuy;
        },
    },
};
</script>
