<template>
    <div class="header-user-panel">
        <div class="header-user-panel__item header-user-panel__account">
            <profile-navigation-panel v-if="!isTabletLg">
                <button @click.prevent="onRegister">
                    <v-svg name="account-middle" width="24" height="24" />
                </button>
            </profile-navigation-panel>
        </div>

        <template v-if="hasSession && canBuy">
            <button class="header-user-panel__item">
                <v-svg name="wishlist-middle" width="24" height="24" />
            </button>
            <div v-if="canBuy" class="header-user-panel__item">
                <price class="text-medium header-user-panel__item-sum" v-bind="productItemsSum" />
                &nbsp;&nbsp;
                <cart-header-panel class="header-user-panel__item-cart">
                    <button @click="onToCart">
                        <v-svg name="cart-middle" width="24" height="24" />
                        <span class="text-bold header-user-panel__item-count">{{ cartItemsCount }}</span>
                    </button>
                </cart-header-panel>
            </div>
        </template>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import Price from '@components/Price/Price.vue';

import CartHeaderPanel from '@components/CartHeaderPanel/CartHeaderPanel.vue';
import ProfileNavigationPanel from '@components/ProfileNavigationPanel/ProfileNavigationPanel.vue';

import { NAME as REGISTRATION_MODAL_NAME } from '@components/RegistrationModal/RegistrationModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY } from '@store/modules/Auth';

import { NAME as CART_MODULE, CART_ITEMS } from '@store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '@store/modules/Cart/getters';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import '@images/sprites/cart-middle.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/account-middle.svg';
import './HeaderUserPanel.critical.css';

export default {
    name: 'header-user-panel',

    components: {
        VSvg,
        VLink,

        Price,

        CartHeaderPanel,
        ProfileNavigationPanel,
    },

    computed: {
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: state => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

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
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onToCart() {
            if (this[HAS_SESSION] && this[CAN_BUY]) this.$router.push({ name: 'Cart' });
        },

        onRegister() {
            if (this[HAS_SESSION]) this.$router.push({ name: 'Cabinet' });
            else this[CHANGE_MODAL_STATE]({ name: REGISTRATION_MODAL_NAME, open: true });
        },
    },
};
</script>
