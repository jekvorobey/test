<template>
    <div class="header-bottom" :class="{ 'header-bottom--scroll': scroll && !isTabletLg }">
        <div class="header-bottom__bottom" v-show="!search">
            <div class="container header-bottom__container">
                <router-link v-if="scroll" class="header-bottom__bottom-logo" to="/">
                    <v-svg name="logo" width="30" height="30" />
                </router-link>

                <header-navigation-panel class="header-bottom__bottom-nav" :scroll="scroll"/>

                <self-router-link class="header-bottom__bottom-logo-middle" to="/" same-disabled>
                    <v-svg name="logo-text" width="278" height="28" />
                    <v-svg name="logo" width="30" height="30" />
                </self-router-link>

                <div class="header-bottom__bottom-menu" v-if="scroll || isTabletLg">
                    <search-filter class="header-bottom__bottom-search" input-id="bottom-filter" />
                    <header-user-panel class="header-bottom__bottom-user" />
                </div>
            </div>
        </div>

        <transition name="fade">
            <div
                class="header-bottom__mask"
                v-if="showMask"
                @touchstart.self.prevent="onCloseMenu"
                @click.self.prevent="onCloseMenu"
                @touchmove.self.prevent
            >
                <search-panel class="header-bottom__search" v-if="search" />
                <nav-panel v-else-if="isMenuOpen" />
            </div>
        </transition>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VBurger from '@controls/VBurger/VBurger.vue';
import SelfRouterLink from '@controls/VLink/SelfRouterLink.vue';

import HeaderUserPanel from '@components/VHeader/HeaderUserPanel/HeaderUserPanel.vue';
import HeaderLogoPanel from '@components/VHeader/HeaderLogoPanel/HeaderLogoPanel.vue';
import HeaderNavigationPanel from '@components/VHeader/HeaderNavigationPanel/HeaderNavigationPanel.vue';
import SearchFilter from '@components/SearchFilter/SearchFilter.vue';
import SearchPanel from '@components/SearchPanel/SearchPanel.vue';
import NavPanel from '@components/NavPanel/NavPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { SCROLL, IS_MENU_OPEN, CATEGORIES } from '@store';
import { SET_MENU_OPEN, FETCH_BANNER } from '@store/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '@store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '@store/modules/Cart/getters';

import { NAME as SEARCH_MODULE, SEARCH } from '@store/modules/Search';
import { SET_SEARCH } from '@store/modules/Search/actions';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import '@images/sprites/logo.svg';
import '@images/sprites/logo-text.svg';

import '@images/sprites/search-middle.svg';
import '@images/sprites/cart-middle.svg';
import '@images/sprites/account-middle.svg';

import './HeaderBottom.critical.css';

export default {
    name: 'header-bottom',
    components: {
        VSvg,
        VLink,
        VBurger,
        SelfRouterLink,

        SearchPanel,
        SearchFilter,
        NavPanel,
        HeaderLogoPanel,
        HeaderUserPanel,
        HeaderNavigationPanel,
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN]),
        ...mapState(SEARCH_MODULE, [SEARCH]),
        ...mapGetters(CART_MODULE, [CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM]),

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        showMask() {
            return this[SEARCH] || (this[IS_MENU_OPEN] && !this.isTabletLg);
        },
    },

    watch: {
        search(value) {
            if (value) this[SET_MENU_OPEN](false);
        },

        $route() {
            this[FETCH_BANNER]();
        },
    },

    methods: {
        ...mapActions([SET_MENU_OPEN, FETCH_BANNER]),
        ...mapActions(SEARCH_MODULE, [SET_SEARCH]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onCloseMenu() {
            this[SET_MENU_OPEN](false);
            this[SET_SEARCH](false);
        },
    },
};
</script>
