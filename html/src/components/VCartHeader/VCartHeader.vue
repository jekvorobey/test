<template>
    <div class="v-cart-header">
        <div class="v-cart-header__main" v-if="!isTabletLg">
            <div class="container v-cart-header__container">
                <cart-header-region-panel
                    class="v-cart-header__region-panel"
                    :class="{ 'v-cart-header__region-panel--hidden': hideCity }"
                />

                <header-logo-panel>
                    {{ $t('header.middle.professionals') }}
                </header-logo-panel>

                <cart-header-user-panel
                    class="v-cart-header__user-panel"
                    :hide-link="hideCity"
                    :hide-favorites="hideFavorites"
                />
            </div>
        </div>

        <div class="v-cart-header__bottom" v-if="isTabletLg">
            <div class="container v-cart-header__container">
                <header-navigation-panel class="v-cart-header__bottom-nav" />

                <router-link class="header-bottom__bottom-logo-middle" to="/">
                    <v-svg name="logo-text" width="278" height="28" />
                    <v-svg name="logo" width="30" height="30" />
                </router-link>

                <help-panel class="cart-header-user-panel__help">
                    <v-svg name="question-middle" width="24" height="24" />
                </help-panel>
            </div>
        </div>

        <transition name="fade">
            <mobile-menu class="v-header__modal-menu" v-if="isMenuOpen && isTabletLg" />
        </transition>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import HelpPanel from '@components/HelpPanel/HelpPanel.vue';
import MobileMenu from '@components/MobileMenu/MobileMenu.vue';
import HeaderNavigationPanel from '@components/VHeader/HeaderNavigationPanel/HeaderNavigationPanel.vue';
import HeaderLogoPanel from '@components/VHeader/HeaderLogoPanel/HeaderLogoPanel.vue';

import CartHeaderUserPanel from '@components/VCartHeader/CartHeaderUserPanel/CartHeaderUserPanel.vue';
import CartHeaderRegionPanel from '@components/VCartHeader/CartHeaderRegionPanel/CartHeaderRegionPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { IS_MENU_OPEN } from '@store';

import '@images/sprites/logo.svg';
import '@images/sprites/logo-text.svg';
import '@images/sprites/question-middle.svg';

import './VCartHeader.css';

export default {
    name: 'v-cart-header',

    components: {
        VSvg,

        HelpPanel,
        MobileMenu,
        HeaderLogoPanel,
        HeaderNavigationPanel,

        CartHeaderRegionPanel,
        CartHeaderUserPanel,
    },

    props: {
        hideCity: {
            type: Boolean,
            default: false,
        },

        hideFavorites: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState([IS_MENU_OPEN]),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },
};
</script>
