<template>
    <div class="header-user-panel">
        <div class="header-user-panel__item header-user-panel__account">
            <profile-navigation-panel v-if="!isTablet">
                <button @click.prevent="onRegister">
                    <v-svg name="account-middle" width="24" height="24" />
                </button>
            </profile-navigation-panel>
        </div>

        <template v-if="hasSession">
            <self-router-link
                class="header-user-panel__item header-user-panel__item--wishlist"
                :to="{ name: 'Favorites' }"
                same-disabled
            >
                <v-svg :name="favoriteItemsIcon" width="24" height="24" />
                <span class="text-bold header-user-panel__item-count" v-if="hasFavoriteItems">
                    {{ favoriteItemsCount }}
                </span>
            </self-router-link>
        </template>
        <div class="header-user-panel__item header-user-panel__item-cart-controls" @click="onToCart">
            <cart-header-panel class="header-user-panel__item-cart">
                <price class="text-medium header-user-panel__item-sum" v-bind="productItemsSum" always-number />
                &nbsp;&nbsp;
                <button class="header-user-panel__cart-btn">
                    <v-svg name="cart-middle" width="24" height="24" />
                    <span class="text-bold header-user-panel__item-count">{{ cartItemsCount }}</span>
                </button>
            </cart-header-panel>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import SelfRouterLink from '@controls/VLink/SelfRouterLink.vue';

import Price from '@components/Price/Price.vue';

import CartHeaderPanel from '@components/CartHeaderPanel/CartHeaderPanel.vue';
import ProfileNavigationPanel from '@components/ProfileNavigationPanel/ProfileNavigationPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as AUTH_MODULE, HAS_SESSION, USER, CAN_BUY } from '@store/modules/Auth';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '@store/modules/Cart/getters';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { FAVORITE_ITEMS_COUNT } from '@store/modules/Favorites/getters';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName, authMode } from '@enums';
import '@images/sprites/cart-middle.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/wishlist-full.svg';
import '@images/sprites/account-middle.svg';
import './HeaderUserPanel.critical.css';

export default {
    name: 'header-user-panel',

    components: {
        VSvg,
        SelfRouterLink,

        Price,

        CartHeaderPanel,
        ProfileNavigationPanel,
    },

    computed: {
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),
        ...mapGetters(FAVORITES_MODULE, [FAVORITE_ITEMS_COUNT]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

        favoriteItemsIcon() {
            return this.hasFavoriteItems && !this.isTabletLg ? 'wishlist-full' : 'wishlist-middle';
        },

        hasFavoriteItems() {
            return this[FAVORITE_ITEMS_COUNT] > 0;
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
            // if (this[HAS_SESSION]) this.$router.push({ name: 'Cart' });
            this.$router.push({ name: 'Cart' });
        },

        onRegister() {
            if (this[HAS_SESSION]) this.$router.push({ name: 'Cabinet' });
            else
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.AUTH,
                    open: true,
                    state: {
                        activeTab: authMode.LOGIN,
                    },
                });
        },
    },
};
</script>
