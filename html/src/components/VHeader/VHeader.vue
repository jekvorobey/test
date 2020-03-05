<template>
    <header
        class="v-header"
        :class="[{ 'v-header--scroll': scroll }, { 'v-header--masked': showMask }, { 'v-header--search': search }]"
    >
        <div class="v-header__desktop">
            <header-top v-if="!scroll" />
            <div class="container v-header__city-confirm">
                <city-confirmation-panel v-if="!isTabletLg" />
            </div>
            <header-bottom />
        </div>

        <transition name="fade">
            <div
                class="v-header__mask"
                v-if="showMask"
                @touchstart.self.prevent="onCloseMenu"
                @click.self.prevent="onCloseMenu"
                @touchmove.self.prevent
            >
                <search-panel v-if="search" />
                <nav-panel v-else-if="isMenuOpen" />
            </div>
        </transition>

        <transition name="fade">
            <mobile-menu class="v-header__modal-menu" v-if="isMenuOpen && isTabletLg" />
        </transition>

        <transition name="fade-in">
            <login-modal key="login" v-if="isLoginOpen" />
            <registration-modal key="register" v-else-if="isRegistrationOpen" />
        </transition>

        <transition name="fade-in">
            <city-selection-modal v-if="isCitySelectionOpen" />
        </transition>
    </header>
</template>

<script>
import HeaderTop from './HeaderTop/HeaderTop.vue';
import HeaderBottom from './HeaderBottom/HeaderBottom.vue';

import NavPanel from '../NavPanel/NavPanel.vue';
import MobileMenu from '../MobileMenu/MobileMenu.vue';
import SearchPanel from '../SearchPanel/SearchPanel.vue';
import CityConfirmationPanel from '../CityConfirmationPanel/CityConfirmationPanel.vue';

import LoginModal, { NAME as LOGIN_MODAL_NAME } from '../LoginModal/LoginModal.vue';
import RegistrationModal, { NAME as REGISTRATION_MODAL_NAME } from '../RegistrationModal/RegistrationModal.vue';
import CitySelectionModal, { NAME as CITY_SELECTION_MODAL_NAME } from '../CitySelectionModal/CitySelectionModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { SCROLL, IS_MENU_OPEN, IS_CITY_CONFIRMATION_OPEN } from '../../store';
import { SET_MENU_OPEN } from '../../store/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import { NAME as SEARCH_MODULE, SEARCH } from '../../store/modules/Search';

import './VHeader.critical.css';
import './VHeader.css';

export default {
    name: 'v-header',

    components: {
        HeaderTop,
        HeaderBottom,

        SearchPanel,
        NavPanel,
        MobileMenu,
        LoginModal,
        RegistrationModal,
        CitySelectionModal,
        CityConfirmationPanel,
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN, IS_CITY_CONFIRMATION_OPEN]),
        ...mapState(SEARCH_MODULE, [SEARCH]),
        ...mapState(MODAL_MODULE, {
            isRegistrationOpen: state =>
                state[MODALS][REGISTRATION_MODAL_NAME] && state[MODALS][REGISTRATION_MODAL_NAME].open,
            isLoginOpen: state => state[MODALS][LOGIN_MODAL_NAME] && state[MODALS][LOGIN_MODAL_NAME].open,
            isCitySelectionOpen: state =>
                state[MODALS][CITY_SELECTION_MODAL_NAME] && state[MODALS][CITY_SELECTION_MODAL_NAME].open,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        showMask() {
            return this[SEARCH] || (this[IS_MENU_OPEN] && !this.isTabletLg);
        },
    },

    methods: {
        ...mapActions([SET_MENU_OPEN]),

        onCloseMenu() {
            this[SET_MENU_OPEN](false);
        },
    },

    watch: {
        search(value) {
            if (value) this.onCloseMenu();
        },
    },
};
</script>
