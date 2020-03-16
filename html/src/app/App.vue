<template>
    <div id="app" class="fake-vue-body" :class="{ 'fake-vue-body--scroll': scroll }">
        <v-header />
        <main>
            <!-- <transition name="fade" mode="out-in"> -->
            <router-view class="view" />
            <!-- </transition> -->
        </main>
        <v-footer />

        <transition name="fade-in">
            <quick-view-modal v-if="isQuickViewOpen && !isTabletLg" />
            <add-to-cart-modal v-else-if="isAddToCartOpen" />
        </transition>

        <transition name="fade-in">
            <login-modal key="login" v-if="isLoginOpen" />
            <registration-modal key="register" v-else-if="isRegistrationOpen" />
        </transition>

        <transition name="fade-in">
            <city-selection-modal v-if="isCitySelectionOpen" />
        </transition>
    </div>
</template>

<script>
import './App.critical.css';
import './App.css';

/**
 * Базовые компоненты страницы
 */

// Часто используемые(и маленькие) компоненты лучше добавить сразу в основной бандл,
// ибо они используются повсеместно на всех страницах, и смысла выносить их в отдельный бандл и грузить отдельно нет
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';

import VHeader from '@components/VHeader/VHeader.vue';
import VFooter from '@components/VFooter/VFooter.vue';

import LoginModal, { NAME as LOGIN_MODAL_NAME } from '@components/LoginModal/LoginModal.vue';
import RegistrationModal, {
    NAME as REGISTRATION_MODAL_NAME,
} from '@components/RegistrationModal/RegistrationModal.vue';
import CitySelectionModal, {
    NAME as CITY_SELECTION_MODAL_NAME,
} from '@components/CitySelectionModal/CitySelectionModal.vue';

import QuickViewModal, { NAME as QUICK_VIEW_MODAL_NAME } from '@components/QuickViewModal/QuickViewModal.vue';
import AddToCartModal, { NAME as ADD_TO_CART_MODAL_NAME } from '@components/AddToCartModal/AddToCartModal.vue';

import _debounce from 'lodash/debounce';
import { mapState, mapActions } from 'vuex';

import { SCROLL, CATEGORIES } from '@store';
import { SET_SCROLL, FETCH_COMMON_DATA, SET_CITY_CONFIRMATION_OPEN } from '@store/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '@store/modules/Cart';
import { FETCH_CART_DATA, CLEAR_CART_DATA } from '@store/modules/Cart/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';
import { CHECK_SESSION, LOGIN_BY_PASSWORD } from '@store/modules/Auth/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { MIN_SCROLL_VALUE, SCROLL_DEBOUCE_TIME } from '@constants';
import { eventName, interval } from '@enums';

export default {
    name: 'app',

    components: {
        VHeader,
        VFooter,

        LoginModal,
        RegistrationModal,
        CitySelectionModal,
        QuickViewModal,
        AddToCartModal,
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),

        ...mapState(MODAL_MODULE, {
            isRegistrationOpen: state =>
                state[MODALS][REGISTRATION_MODAL_NAME] && state[MODALS][REGISTRATION_MODAL_NAME].open,
            isLoginOpen: state => state[MODALS][LOGIN_MODAL_NAME] && state[MODALS][LOGIN_MODAL_NAME].open,
            isCitySelectionOpen: state =>
                state[MODALS][CITY_SELECTION_MODAL_NAME] && state[MODALS][CITY_SELECTION_MODAL_NAME].open,
            isQuickViewOpen: state => state[MODALS][QUICK_VIEW_MODAL_NAME] && state[MODALS][QUICK_VIEW_MODAL_NAME].open,
            isAddToCartOpen: state =>
                state[MODALS][ADD_TO_CART_MODAL_NAME] && state[MODALS][ADD_TO_CART_MODAL_NAME].open,
        }),
    },

    methods: {
        ...mapActions([SET_SCROLL, FETCH_COMMON_DATA, SET_CITY_CONFIRMATION_OPEN]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA, CLEAR_CART_DATA]),
        ...mapActions(AUTH_MODULE, [CHECK_SESSION, LOGIN_BY_PASSWORD]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onScroll() {
            this[SET_SCROLL](
                document.body.scrollTop > MIN_SCROLL_VALUE || document.documentElement.scrollTop > MIN_SCROLL_VALUE
            );
        },

        scrollFix(hashbang) {
            window.location.hash = null;
            window.location.hash = hashbang;
        },

        startSessionTimer() {
            this.stopSessionTimer();
            this.sessionTimer = setInterval(this[CHECK_SESSION], interval.MINUTE);
        },

        stopSessionTimer() {
            clearInterval(this.sessionTimer);
        },
    },

    watch: {
        [HAS_SESSION](value) {
            if (value) this[FETCH_CART_DATA]();
            else this[CLEAR_CART_DATA]();
            this.startSessionTimer();
        },
    },

    async serverPrefetch() {
        try {
            await this[FETCH_COMMON_DATA]();
            await this[CHECK_SESSION](true);
            if (this[HAS_SESSION]) await this[FETCH_CART_DATA]();
            else return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    },

    beforeMount() {
        this.startSessionTimer();
    },

    mounted() {
        const onSetScrollDebounce = _debounce(this.onScroll, SCROLL_DEBOUCE_TIME);
        document.addEventListener(eventName.SCROLL, onSetScrollDebounce, true);
        this.$once('hook:beforeDestroy', () => document.removeEventListener(eventName.SCROLL, onSetScrollDebounce));

        // скролл страницы до хеша при первой загрузке страницы
        if (this.$route.hash) setTimeout(() => this.scrollFix(this.$route.hash), 1);

        setTimeout(() => {
            this[SET_CITY_CONFIRMATION_OPEN](true);
        }, interval.TWO_SECONDS);
    },

    beforeDestroy() {
        this.stopSessionTimer();
    },
};
</script>
