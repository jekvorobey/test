<template>
    <header
        class="v-header"
        :class="[{ 'v-header--scroll': scroll }, { 'v-header--masked': showMask }, { 'v-header--search': search }]"
    >
        <div class="v-header__desktop">
            <header-top v-show="!scroll" />
            <header-bottom />
        </div>

        <transition name="fade">
            <div class="v-header__mask" v-if="showMask" @touchstart.self.prevent @touchmove.self.prevent>
                <search-panel v-if="search" />
                <nav-panel v-else-if="isMenuOpen" />
            </div>
        </transition>

        <transition name="fade">
            <mobile-menu class="v-header__modal-menu" v-if="isMenuOpen && isTabletLg" />
        </transition>

        <transition name="fade">
            <login-modal @login="$router.push({ path: '/profile' })" />
        </transition>
    </header>
</template>

<script>
import HeaderTop from './HeaderTop/HeaderTop.vue';
import HeaderBottom from './HeaderBottom/HeaderBottom.vue';

import SearchPanel from '../SearchPanel/SearchPanel.vue';
import NavPanel from '../NavPanel/NavPanel.vue';
import MobileMenu from '../MobileMenu/MobileMenu.vue';
import LoginModal from '../LoginModal/LoginModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { SCROLL, IS_MENU_OPEN } from '../../store';
import { SET_MENU_OPEN } from '../../store/actions';

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
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN]),
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
    },

    watch: {
        search(value) {
            if (value) this[SET_MENU_OPEN](false);
        },
    },
};
</script>
