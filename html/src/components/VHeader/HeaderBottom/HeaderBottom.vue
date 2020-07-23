<template>
    <div class="header-bottom" :class="{ 'header-bottom--scroll': scroll && !isTabletLg }">
        <transition
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
        >
            <div key="bottom-main" class="header-bottom__main" v-show="!scroll">
                <div class="container header-bottom__container header-bottom__main-container">
                    <search-filter
                        class="header-bottom__main-search"
                        input-id="upper-filter"
                        v-show="!isTabletLg || (search && isTabletLg)"
                    />
                    <header-logo-panel v-show="!search && !isTabletLg">
                        {{ $t('header.middle.professionals') }}
                    </header-logo-panel>
                    <header-user-panel class="header-bottom__main-user" v-show="!search && !isTabletLg" />
                </div>
            </div>
        </transition>
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
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VBurger from '@controls/VBurger/VBurger.vue';

import HeaderUserPanel from '@components/VHeader/HeaderUserPanel/HeaderUserPanel.vue';
import HeaderLogoPanel from '@components/VHeader/HeaderLogoPanel/HeaderLogoPanel.vue';
import HeaderNavigationPanel from '@components/VHeader/HeaderNavigationPanel/HeaderNavigationPanel.vue';
import SearchFilter from '@components/SearchFilter/SearchFilter.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { SCROLL, IS_MENU_OPEN, CATEGORIES } from '@store';
import { SET_MENU_OPEN } from '@store/actions';

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

        onBeforeEnter(el) {
            el.style.height = 0;
        },

        itemAnimation(el, value, delay) {
            return new Promise((resolve, reject) => {
                try {
                    requestAnimationFrame(() => {
                        el.style.height = value + 'px';
                        setTimeout(() => {
                            resolve();
                        }, delay);
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },

        async onEnter(el, done) {
            await this.itemAnimation(el, el.scrollHeight, 800);
            done();
        },

        onAfterEnter(el) {
            el.style.height = 'auto';
        },

        onBeforeLeave(el) {
            el.style.height = el.scrollHeight + 'px';
        },

        async onLeave(el, done) {
            await this.itemAnimation(el, 0, 800);
            done();
        },
    },

    watch: {
        search(value) {
            if (value) this[SET_MENU_OPEN](false);
        },
    },
};
</script>
