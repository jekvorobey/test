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

                <router-link class="cart-header-user-panel__btn" to="/favorites">
                    <v-svg :name="favoriteItemsIcon" width="24" height="24" />
                    <span class="cart-header-user-panel__btn-count" v-if="hasFavoriteItems">
                        {{ favoriteItemsCount }}
                    </span>
                </router-link>
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

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { FAVORITE_ITEMS_COUNT } from '@store/modules/Favorites/getters';

import { modalName } from '@enums';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/wishlist-full.svg';
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
        ...mapGetters(FAVORITES_MODULE, [FAVORITE_ITEMS_COUNT]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: state => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

        favoriteItemsIcon() {
            return this.hasFavoriteItems ? 'wishlist-full' : 'wishlist-middle';
        },

        hasFavoriteItems() {
            return this[FAVORITE_ITEMS_COUNT] > 0;
        },
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
