<template>
    <div class="header-user-panel">
        <button class="header-user-panel__item" @click="onRegister">
            <v-svg name="account-middle" width="24" height="24" />
        </button>
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
import { NAME as REGISTRATION_MODAL_NAME } from '../../RegistrationModal/RegistrationModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { IS_CART_OPEN } from '../../../store';
import { SET_CART_OPEN } from '../../../store/mutations';

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
    },

    computed: {
        ...mapState([IS_CART_OPEN]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions([SET_CART_OPEN]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onToggleCart() {
            if (this.isTablet) {
                this[SET_CART_OPEN](false);
                this.$router.push({ name: 'Cart' });
            } else this[SET_CART_OPEN](!this.isCartOpen);
        },

        onRegister() {
            if (this.hasSession) this.$router.push({ name: 'Cabinet' });
            else this[CHANGE_MODAL_STATE]({ name: REGISTRATION_MODAL_NAME, open: true });
        },
    },
};
</script>
