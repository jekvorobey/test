<template>
    <div class="header-bottom" :class="{ 'header-bottom--scroll': scroll && !isTabletLg }">
        <div class="header-bottom__main" v-if="!scroll">
            <div class="container header-bottom__container">
                <search-filter class="header-bottom__main-search" input-id="upper-filter" />
                <header-logo-panel v-show="!search" />
                <header-user-panel class="header-bottom__main-user" v-show="!search" />
            </div>
        </div>
        <div class="header-bottom__bottom" v-show="!search">
            <div class="container header-bottom__container">
                <template v-if="scroll">
                    <router-link class="header-bottom__bottom-logo" to="/">
                        <v-svg name="logo" width="30" height="30" />
                    </router-link>
                </template>
                <header-navigation-panel class="header-bottom__bottom-nav" />
                <router-link class="header-bottom__bottom-logo-middle" to="/">
                    <v-svg name="logo-text" width="278" height="28" />
                    <v-svg name="logo" width="30" height="30" />
                </router-link>
                <template v-if="scroll || isTabletLg">
                    <search-filter class="header-bottom__bottom-search" input-id="bottom-filter" />
                    <header-user-panel class="header-bottom__bottom-user" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VLink from '../../controls/VLink/VLink.vue';
import VBurger from '../../controls/VBurger/VBurger.vue';

import HeaderUserPanel from '../HeaderUserPanel/HeaderUserPanel.vue';
import HeaderLogoPanel from '../HeaderLogoPanel/HeaderLogoPanel.vue';
import HeaderNavigationPanel from '../HeaderNavigationPanel/HeaderNavigationPanel.vue';
import SearchFilter from '../../SearchFilter/SearchFilter.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { SCROLL, IS_MENU_OPEN, CATEGORIES } from '../../../store';
import { SET_MENU_OPEN } from '../../../store/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '../../../store/modules/Cart';
import { CART_ITEMS_COUNT, PRODUCT_ITEMS_SUM } from '../../../store/modules/Cart/getters';

import { NAME as SEARCH_MODULE, SEARCH } from '../../../store/modules/Search';
import { SET_SEARCH } from '../../../store/modules/Search/actions';

import { NAME as MODAL_MODULE } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import '../../../assets/images/sprites/logo.svg';
import '../../../assets/images/sprites/logo-text.svg';

import '../../../assets/images/sprites/search-middle.svg';
import '../../../assets/images/sprites/cart-middle.svg';
import '../../../assets/images/sprites/wishlist-middle.svg';
import '../../../assets/images/sprites/account-middle.svg';

import './HeaderBottom.critical.css';

export default {
    name: 'header-bottom',
    components: {
        VSvg,
        VLink,
        VBurger,

        SearchFilter,
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

    methods: {
        ...mapActions([SET_MENU_OPEN]),
        ...mapActions(SEARCH_MODULE, [SET_SEARCH]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
    },

    watch: {
        search(value) {
            if (value) this[SET_MENU_OPEN](false);
        },
    },
};
</script>
