<template>
    <div class="header-user-panel">
        <div class="header-user-panel__item header-user-panel__account">
            <button @click.prevent="onRegister">
                <v-svg name="account-middle" width="24" height="24" />
            </button>
            <profile-navigation-panel v-if="!isTabletLg" />
        </div>

        <template v-if="hasSession">
            <button class="header-user-panel__item">
                <v-svg name="wishlist-middle" width="24" height="24" />
            </button>
            <div class="header-user-panel__item">
                <span class="text-medium header-user-panel__item-sum">{{ productItemsSum }}</span>
                &nbsp;&nbsp;
                <button class="header-user-panel__item-cart" @click="onToggleCart">
                    <v-svg name="cart-middle" width="24" height="24" />
                    <span class="text-bold header-user-panel__item-count">{{ cartItemsCount }}</span>
                </button>
                <cart-header-panel v-if="!isTabletLg" />
            </div>
        </template>
    </div>
</template>

<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VLink from '../../controls/VLink/VLink.vue';

import CartHeaderPanel from '../../CartHeaderPanel/CartHeaderPanel.vue';
import ProfileNavigationPanel from '../../ProfileNavigationPanel/ProfileNavigationPanel.vue';

import { NAME as REGISTRATION_MODAL_NAME } from '../../RegistrationModal/RegistrationModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { IS_CART_OPEN, IS_PROFILE_PANEL_OPEN } from '../../../store';
import { SET_CART_OPEN } from '../../../store/mutations';
import { SET_PROFILE_PANEL_OPEN } from '../../../store/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '../../../store/modules/Auth';

import { NAME as CART_MODULE, CART_ITEMS } from '../../../store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '../../../store/modules/Cart/getters';

import { NAME as MODAL_MODULE } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import '../../../assets/images/sprites/cart-middle.svg';
import '../../../assets/images/sprites/wishlist-middle.svg';
import '../../../assets/images/sprites/account-middle.svg';
import './HeaderUserPanel.critical.css';

export default {
    name: 'header-user-panel',

    components: {
        VSvg,
        VLink,

        CartHeaderPanel,
        ProfileNavigationPanel,
    },

    computed: {
        ...mapState([IS_CART_OPEN, IS_PROFILE_PANEL_OPEN]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),

        groups() {
            return [
                {
                    id: 1,
                    name: this.$t('profile.groups.profile'),
                    routes: [
                        { name: 'Cabinet', exact: true },
                        { name: 'Preferences', exact: true },
                        { name: 'Addresses', exact: true },
                        { name: 'Payment', exact: true },
                        { name: 'Subscribes', exact: true },
                        { name: 'Messages', displayName: this.$tc('profile.format.messages', 5) },
                        { name: 'Certificates', exact: true },
                        { name: 'Bonuses', exact: true },
                        { name: 'Orders' },
                        { name: 'ReferalOrders' },
                    ],
                },
                {
                    id: 2,
                    name: this.$t('profile.groups.business'),
                    routes: [
                        { name: 'Referal', exact: true },
                        { name: 'ProPreferences', exact: true },
                        { name: 'Promopage', exact: true },
                        { name: 'Seo', exact: true },
                        { name: 'Promocodes', exact: true },
                        { name: 'Account', exact: true },
                        { name: 'Billing', exact: true },
                        { name: 'Documents', exact: true },
                    ],
                },
                {
                    id: 3,
                    name: this.$t('profile.groups.training'),
                    routes: [
                        { name: 'HowItWorks', exact: true },
                        { name: 'Guides' },
                        { name: 'Masterclasses', exact: true },
                        { name: 'QnA', exact: true },
                    ],
                },
            ];
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions([SET_CART_OPEN, SET_PROFILE_PANEL_OPEN]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onToggleCart() {
            if (this.isTablet) {
                this[SET_CART_OPEN](false);
                this.$router.push({ name: 'Cart' });
            } else this[SET_CART_OPEN](!this.isCartOpen);
        },

        onRegister() {
            if (this[HAS_SESSION]) this[SET_PROFILE_PANEL_OPEN](true);
            else this[CHANGE_MODAL_STATE]({ name: REGISTRATION_MODAL_NAME, open: true });
        },
    },
};
</script>
