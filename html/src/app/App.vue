<template>
    <div
        id="app"
        class="fake-vue-body"
        :class="{ 'fake-vue-body--scroll': scroll, 'fake-vue-body--hidden-header': hideDefaultHeader }"
    >
        <v-header class="header" v-if="!hideDefaultHeader" :is-sticky="isTabletLg || scroll" />
        <main class="content">
            <!-- <transition name="fade" mode="out-in"> -->
            <router-view class="view" />
            <!-- </transition> -->
        </main>
        <v-footer v-if="!hideDefaultFooter" class="footer" />

        <transition name="fade-in">
            <quick-view-modal v-if="isQuickViewOpen && !isTabletLg" />
            <add-to-cart-modal v-else-if="isAddToCartOpen" />
        </transition>

        <transition name="fade-in">
            <quick-variant-add-to-card-modal v-if="isQuickVariantAddToCardOpen" />
        </transition>

        <transition name="fade-in">
            <quick-masterclass-add-to-cart-modal v-if="isQuickMasterclassAddToCardOpen" />
        </transition>

        <transition name="fade-in">
            <city-selection-modal v-if="isCitySelectionOpen" />
        </transition>

        <transition name="fade-in">
            <notification-modal v-if="isNotificationOpen" />
        </transition>

        <transition name="fade-in">
            <snack-notification-modal v-if="isSnackNotificationOpen" />
        </transition>

        <transition name="fade-in">
            <professional-disclaimer-modal v-if="isProfessionalDisclaimerOpen" />
        </transition>

        <transition name="fade-in">
            <auth-modal v-if="isAuthOpen" />
        </transition>

        <transition name="fade-in">
            <home-first-modal v-if="isHomeFirstOpen" />
        </transition>
    </div>
</template>

<script>
import '../assets/styles/normalize.css';
import '../assets/styles/animation.css';
import '../assets/styles/container.css';

import './App.critical.css';
import './App.css';

import '../assets/styles/general.css';

/**
 * Базовые компоненты страницы
 */

import Vue from 'vue';
import SocialSharing from 'vue-social-sharing';

// Часто используемые(и маленькие) компоненты лучше добавить сразу в основной бандл,
// ибо они используются повсеместно на всех страницах, и смысла выносить их в отдельный бандл и грузить отдельно нет
import VSvg from '@controls/VSvg/VSvg.vue';
import '@controls/VLink/VLink.vue';
import '@controls/VButton/VButton.vue';
import '@controls/VInput/VInput.vue';
import '@controls/VCheck/VCheck.vue';
import '@controls/VSticky/VSticky.vue';
import '@controls/VPicture/VPicture.vue';
import '@controls/VSelect/VSelect.vue';

import '@components/ProgressBar/ProgressBar.vue';
import '@components/FilterButton/FilterButton.vue';
import '@components/Price/Price.vue';
import '@components/TagItem/TagItem.vue';
import '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import VHeader from '@components/VHeader/VHeader.vue';
import VFooter from '@components/VFooter/VFooter.vue';

import CitySelectionModal from '@components/CitySelectionModal/CitySelectionModal.vue';
import QuickViewModal from '@components/QuickViewModal/QuickViewModal.vue';
import AddToCartModal from '@components/AddToCartModal/AddToCartModal.vue';
import NotificationModal from '@components/NotificationModal/NotificationModal.vue';
import SnackNotificationModal from '@components/SnackNotificationModal/SnackNotificationModal.vue';
import AuthModal from '@components/AuthModal/AuthModal.vue';
import HomeFirstModal from '@components/HomeFirstModal/HomeFirstModal.vue';
import QuickVariantAddToCardModal from '@components/QuickVariantAddToCartModal/QuickVariantAddToCardModal.vue';
import QuickMasterclassAddToCartModal from '@components/QuickMasterclassAddToCartModal/QuickMasterclassAddToCartModal.vue';
import ProfessionalDisclaimerModal from '@components/ProfessionalDisclaimerModal/ProfessionalDisclaimerModal.vue';

import { mapState, mapActions } from 'vuex';

import { SET_SCROLL, FETCH_COMMON_DATA, SET_CITY_CONFIRMATION_OPEN } from '@store/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { FETCH_CART_DATA, CLEAR_CART_DATA } from '@store/modules/Cart/actions';

import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import { CLEAR_CHECKOUT_DATA } from '@store/modules/Checkout/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { FETCH_FAVORITES_ALL } from '@store/modules/Favorites/actions';

import { NAME as AUTH_MODULE, HAS_SESSION, USER } from '@store/modules/Auth';
import { CHECK_SESSION, FETCH_USER, FETCH_UNREAD_MESSAGES } from '@store/modules/Auth/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE, READ_MODAL_OPENING_HISTORY } from '@store/modules/Modal/actions';

import { $cookie } from '@services';
import { eventName, interval, modalName, cookieNames } from '@enums';
import { SCROLL, IS_MENU_OPEN } from '@store';

Vue.use(SocialSharing);
Vue.component('v-svg', VSvg);

export default {
    name: 'app',

    components: {
        VHeader,
        VFooter,

        CitySelectionModal,
        QuickViewModal,
        AddToCartModal,
        NotificationModal,
        SnackNotificationModal,
        AuthModal,
        HomeFirstModal,
        QuickVariantAddToCardModal,
        QuickMasterclassAddToCartModal,
        ProfessionalDisclaimerModal,
    },

    data() {
        return {
            isSticky: false,
        };
    },

    computed: {
        ...mapState([SCROLL, IS_MENU_OPEN]),
        ...mapState(AUTH_MODULE, [HAS_SESSION, USER]),

        ...mapState('route', {
            hideDefaultHeader: (state) => state.meta.hideDefaultHeader,
            hideDefaultFooter: (state) => state.meta.hideDefaultFooter,
        }),

        ...mapState(MODAL_MODULE, {
            isCitySelectionOpen: (state) =>
                state[MODALS][modalName.general.CITY_SELECTION] && state[MODALS][modalName.general.CITY_SELECTION].open,
            isQuickViewOpen: (state) =>
                state[MODALS][modalName.general.QUICK_VIEW] && state[MODALS][modalName.general.QUICK_VIEW].open,
            isAddToCartOpen: (state) =>
                state[MODALS][modalName.general.ADD_TO_CART] && state[MODALS][modalName.general.ADD_TO_CART].open,
            isQuickVariantAddToCardOpen: (state) =>
                state[MODALS][modalName.general.QUICK_VARIANT_ADD_TO_CARD] &&
                state[MODALS][modalName.general.QUICK_VARIANT_ADD_TO_CARD].open,
            isQuickMasterclassAddToCardOpen: (state) =>
                state[MODALS][modalName.general.QUICK_MASTERCLASS_ADD_TO_CART] &&
                state[MODALS][modalName.general.QUICK_MASTERCLASS_ADD_TO_CART].open,
            isNotificationOpen: (state) =>
                state[MODALS][modalName.general.NOTIFICATION] && state[MODALS][modalName.general.NOTIFICATION].open,
            isSnackNotificationOpen: (state) =>
                state[MODALS][modalName.general.SNACK_NOTIFICATION] &&
                state[MODALS][modalName.general.SNACK_NOTIFICATION].open,
            isAuthOpen: (state) => state[MODALS][modalName.general.AUTH] && state[MODALS][modalName.general.AUTH].open,
            isHomeFirstOpen: (state) =>
                state[MODALS][modalName.general.HOME_FIRST] && state[MODALS][modalName.general.HOME_FIRST].open,
            isProfessionalDisclaimerOpen: (state) =>
                state[MODALS][modalName.general.PROFESSIONAL_DISCLAIMER] &&
                state[MODALS][modalName.general.PROFESSIONAL_DISCLAIMER].open,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions([SET_SCROLL, FETCH_COMMON_DATA, SET_CITY_CONFIRMATION_OPEN]),
        ...mapActions(AUTH_MODULE, [CHECK_SESSION, FETCH_USER, FETCH_UNREAD_MESSAGES]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA, CLEAR_CART_DATA]),
        ...mapActions(CHECKOUT_MODULE, [CLEAR_CHECKOUT_DATA]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE, READ_MODAL_OPENING_HISTORY]),
        ...mapActions(FAVORITES_MODULE, [FETCH_FAVORITES_ALL]),

        onCheckUserData() {
            this[FETCH_USER]();
            this[FETCH_UNREAD_MESSAGES]();
        },

        onCheckCitySelection() {
            const geoData = $cookie.get(cookieNames.IBT_GEOLOCATION);
            this[SET_CITY_CONFIRMATION_OPEN](!geoData);
        },

        onScroll() {
            const result = window.pageYOffset > 122;
            this[SET_SCROLL](result);
        },

        scrollFix() {
            window.location.hash = null;
            window.location.hash = this.$route.hash;
        },

        startSessionTimer() {
            this.stopSessionTimer();
            this.sessionTimer = setInterval(this[CHECK_SESSION], interval.MINUTE);
        },

        stopSessionTimer() {
            clearInterval(this.sessionTimer);
        },

        startUserDataTimer() {
            this.stopUserDataTimer();
            this.userDataTimer = setInterval(this.onCheckUserData, interval.FIVE_MINUTES);
        },

        stopUserDataTimer() {
            clearInterval(this.userDataTimer);
        },
    },

    watch: {
        async [HAS_SESSION](value) {
            if (this.$route.name !== 'Cart') {
                await this[FETCH_CART_DATA]();
            }

            await this[FETCH_FAVORITES_ALL]();

            if (value) {
                await this[FETCH_USER]();
                this.startUserDataTimer();
            } else {
                this[CLEAR_CHECKOUT_DATA]();
                this.stopUserDataTimer();
            }
            this.startSessionTimer();
        },
    },

    async serverPrefetch() {
        try {
            await Promise.all([this[FETCH_COMMON_DATA](), this[CHECK_SESSION](true)]);

            await this[FETCH_CART_DATA]();
            await this[FETCH_FAVORITES_ALL]();

            if (this[HAS_SESSION]) {
                if (!this[USER]) await this[FETCH_USER]();
            } else return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    },

    beforeMount() {
        this.startSessionTimer();

        if (this[HAS_SESSION]) {
            this[FETCH_UNREAD_MESSAGES]();
            this.startUserDataTimer();
        }

        this[READ_MODAL_OPENING_HISTORY]();
    },

    mounted() {
        // const onSetScrollDebounce = _debounce(this.onScroll, SCROLL_DEBOUNCE_TIME);
        // document.addEventListener(eventName.SCROLL, onSetScrollDebounce, true);
        // this.$once('hook:beforeDestroy', () => document.removeEventListener(eventName.SCROLL, onSetScrollDebounce));

        window.addEventListener(eventName.SCROLL, this.onScroll);

        // скролл страницы до хеша при первой загрузке страницы
        if (this.$route.hash) setTimeout(this.scrollFix, 1);
        setTimeout(this.onCheckCitySelection, interval.TWO_SECONDS);
    },

    beforeDestroy() {
        this.stopSessionTimer();
        window.removeEventListener(eventName.SCROLL, this.onScroll);
    },
};
</script>
