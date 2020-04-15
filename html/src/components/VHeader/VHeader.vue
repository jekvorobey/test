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
    </header>
</template>

<script>
import HeaderTop from './HeaderTop/HeaderTop.vue';
import HeaderBottom from './HeaderBottom/HeaderBottom.vue';

import NavPanel from '@components/NavPanel/NavPanel.vue';
import MobileMenu from '@components/MobileMenu/MobileMenu.vue';
import SearchPanel from '@components/SearchPanel/SearchPanel.vue';
import CityConfirmationPanel from '@components/CityConfirmationPanel/CityConfirmationPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { SCROLL, IS_MENU_OPEN, IS_CITY_CONFIRMATION_OPEN } from '@store';
import { SET_MENU_OPEN } from '@store/actions';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as SEARCH_MODULE, SEARCH } from '@store/modules/Search';

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

        CityConfirmationPanel,
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN, IS_CITY_CONFIRMATION_OPEN]),
        ...mapState(SEARCH_MODULE, [SEARCH]),

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
