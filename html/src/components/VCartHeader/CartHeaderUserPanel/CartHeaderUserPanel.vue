<template>
    <div class="cart-header-user-panel">
        <router-link class="cart-header-user-panel__link" :to="'/'">Вернуться к покупкам</router-link>
        <help-panel class="cart-header-user-panel__help">
            {{ $t('header.top.help') }}
            <v-svg name="arrow-down" width="20" height="20" />
        </help-panel>
        <template v-if="hasSession">
            <div class="cart-header-user-panel__controls">
                <profile-navigation-panel class="cart-header-user-panel__account">
                    <button @click.prevent="onRegister" class="cart-header-user-panel__btn">
                        <v-svg name="account-middle" width="24" height="24" />
                    </button>
                </profile-navigation-panel>
                <!-- Скрыто из-за отсутствия избранных
                    <button class="cart-header-user-panel__btn">
                    <v-svg name="wishlist-middle" width="24" height="24" />
                    </button>
                -->
            </div>
        </template>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import HelpPanel from '@components/HelpPanel/HelpPanel.vue';
import ProfileNavigationPanel from '@components/ProfileNavigationPanel/ProfileNavigationPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY } from '@store/modules/Auth';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName } from '@enums';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/account-middle.svg';
import '@images/sprites/arrow-down.svg';
import './CartHeaderUserPanel.css';

export default {
    name: 'header-cart-user-panel',

    components: {
        VSvg,

        ProfileNavigationPanel,
        HelpPanel,
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onRegister() {
            if (this[HAS_SESSION]) this.$router.push({ name: 'Cabinet' });
            else this[CHANGE_MODAL_STATE]({ name: modalName.general.LOGIN, open: true });
        },
    },
};
</script>
