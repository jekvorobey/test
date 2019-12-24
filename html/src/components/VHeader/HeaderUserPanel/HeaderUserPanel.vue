<template>
    <div class="header-user-panel">
        <button class="header-user-panel__item" @click="onRegister">
            <v-svg name="account-middle" width="24" height="24" />
        </button>
        <button class="header-user-panel__item">
            <v-svg name="wishlist-middle" width="24" height="24" />
        </button>
        <div class="header-user-panel__item">
            <span class="text-medium header-user-panel__item-sum">{{ productItemsSum }}</span>
            &nbsp;&nbsp;
            <v-link class="header-user-panel__item-cart" to="/cart">
                <v-svg name="cart-middle" width="24" height="24" />
                <span class="text-bold header-user-panel__item-count">{{ cartItemsCount }}</span>
            </v-link>
        </div>
    </div>
</template>

<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VLink from '../../controls/VLink/VLink.vue';
import { NAME as REGISTRATION_MODAL_NAME } from '../../RegistrationModal/RegistrationModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

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
    },

    computed: {
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onRegister() {
            this[CHANGE_MODAL_STATE]({ name: REGISTRATION_MODAL_NAME, open: true });
        },
    },
};
</script>
