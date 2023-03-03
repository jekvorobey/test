<template>
        <header class="v-header" :class="[{ sticky: isSticky }, { 'v-header--search': search }]">
            <header-top class="v-header__top" />
            <header-middle class="v-header__middle" ref="middle" />
            <banner-through/>
            <header-bottom class="v-header__bottom" ref="bottom" />
            <transition name="fade">
                <mobile-menu class="v-header__modal-menu" v-if="isMenuOpen && isTabletLg" />
            </transition>

            <transition name="fade" appear>
                <city-confirmation-panel v-if="!isTabletLg && isCityConfirmationOpen" />
            </transition>
        </header>
</template>

<script>
import HeaderTop from './HeaderTop/HeaderTop.vue';
import HeaderMiddle from './HeaderMiddle/HeaderMiddle.vue';
import HeaderBottom from './HeaderBottom/HeaderBottom.vue';
import NavPanel from '@components/NavPanel/NavPanel.vue';
import MobileMenu from '@components/MobileMenu/MobileMenu.vue';
import SearchPanel from '@components/SearchPanel/SearchPanel.vue';
import CityConfirmationPanel from '@components/CityConfirmationPanel/CityConfirmationPanel.vue';
import BannerThrough from "@components/BannerThrough/BannerThrough.vue";

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
        HeaderMiddle,
        HeaderBottom,
        SearchPanel,
        NavPanel,
        MobileMenu,
        BannerThrough,
        CityConfirmationPanel,
    },

    props: {
        isSticky: {
            type: Boolean,
            default: false,
        },
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
};
</script>
