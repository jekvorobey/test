<template>
    <div
        id="app"
        class="fake-vue-body"
        :class="{ 'fake-vue-body--scroll': scroll, 'fake-vue-body--hidden-header': hideDefaultHeader }"
    >
        <v-header v-if="!hideDefaultHeader" />
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
            <city-selection-modal v-if="isCitySelectionOpen" />
        </transition>

        <transition name="fade-in">
            <notification-modal v-if="isNotificationOpen" />
        </transition>

        <transition name="fade-in">
            <auth-modal v-if="isAuthOpen" />
        </transition>
    </div>
</template>

<script>
import './App.critical.css';
import './App.css';

/**
 * Базовые компоненты страницы
 */

import Vue from 'vue';
import SocialSharing from 'vue-social-sharing';

// Часто используемые(и маленькие) компоненты лучше добавить сразу в основной бандл,
// ибо они используются повсеместно на всех страницах, и смысла выносить их в отдельный бандл и грузить отдельно нет
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import ProgressBar from '@components/ProgressBar/ProgressBar.vue';
import FilterButton from '@components/FilterButton/FilterButton.vue';
import Price from '@components/Price/Price.vue';
import TagItem from '@components/TagItem/TagItem.vue';

import VHeader from '@components/VHeader/VHeader.vue';
import VFooter from '@components/VFooter/VFooter.vue';

import CitySelectionModal from '@components/CitySelectionModal/CitySelectionModal.vue';
import QuickViewModal from '@components/QuickViewModal/QuickViewModal.vue';
import AddToCartModal from '@components/AddToCartModal/AddToCartModal.vue';
import NotificationModal from '@components/NotificationModal/NotificationModal.vue';
import AuthModal from '@components/AuthModal/AuthModal.vue';

import _debounce from 'lodash/debounce';
import { mapState, mapActions } from 'vuex';

import { SCROLL, CATEGORIES } from '@store';
import { SET_SCROLL, FETCH_COMMON_DATA, SET_CITY_CONFIRMATION_OPEN } from '@store/actions';

import { NAME as GEO_MODULE } from '@store/modules/Geolocation';
import { SET_SELECTED_CITY_BY_IP } from '@store/modules/Geolocation/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '@store/modules/Cart';
import { FETCH_CART_DATA, CLEAR_CART_DATA } from '@store/modules/Cart/actions';

import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import { CLEAR_CHECKOUT_DATA } from '@store/modules/Checkout/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { FETCH_FAVORITES_ALL } from '@store/modules/Favorites/actions';

import { NAME as AUTH_MODULE, HAS_SESSION, CAN_BUY, USER } from '@store/modules/Auth';
import { CHECK_SESSION, FETCH_USER, FETCH_UNREAD_MESSAGES } from '@store/modules/Auth/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { $cookie } from '@services';
import { eventName, interval, modalName, cookieNames } from '@enums';
import { MIN_SCROLL_VALUE, SCROLL_DEBOUNCE_TIME } from '@constants';

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
        AuthModal,
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState(AUTH_MODULE, [HAS_SESSION, USER]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: state => (state[USER] && state[USER][CAN_BUY]) || false,
        }),

        ...mapState('route', {
            hideDefaultHeader: state => state.meta.hideDefaultHeader,
        }),

        ...mapState(MODAL_MODULE, {
            isCitySelectionOpen: state =>
                state[MODALS][modalName.general.CITY_SELECTION] && state[MODALS][modalName.general.CITY_SELECTION].open,
            isQuickViewOpen: state =>
                state[MODALS][modalName.general.QUICK_VIEW] && state[MODALS][modalName.general.QUICK_VIEW].open,
            isAddToCartOpen: state =>
                state[MODALS][modalName.general.ADD_TO_CART] && state[MODALS][modalName.general.ADD_TO_CART].open,
            isNotificationOpen: state =>
                state[MODALS][modalName.general.NOTIFICATION] && state[MODALS][modalName.general.NOTIFICATION].open,
            isAuthOpen: state => state[MODALS][modalName.general.AUTH] && state[MODALS][modalName.general.AUTH].open,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions([SET_SCROLL, FETCH_COMMON_DATA, SET_CITY_CONFIRMATION_OPEN]),
        ...mapActions(GEO_MODULE, [SET_SELECTED_CITY_BY_IP]),
        ...mapActions(AUTH_MODULE, [CHECK_SESSION, FETCH_USER, FETCH_UNREAD_MESSAGES]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA, CLEAR_CART_DATA]),
        ...mapActions(CHECKOUT_MODULE, [CLEAR_CHECKOUT_DATA]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [FETCH_FAVORITES_ALL]),

        onCheckCitySelection() {
            const geoData = $cookie.get(cookieNames.IBT_GEOLOCATION);
            this[SET_CITY_CONFIRMATION_OPEN](!geoData);
        },

        onScroll() {
            this[SET_SCROLL](
                document.body.scrollTop > MIN_SCROLL_VALUE || document.documentElement.scrollTop > MIN_SCROLL_VALUE
            );
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

        startUnreadCheckTimer() {
            this.stopUnreadCheckTimer();
            this.unreadCheckTimer = setInterval(this[FETCH_UNREAD_MESSAGES], interval.FIVE_MINUTES);
        },

        stopUnreadCheckTimer() {
            clearInterval(this.unreadCheckTimer);
        },
    },

    watch: {
        async [HAS_SESSION](value) {
            if (value) {
                await this[FETCH_USER]();
                if (this[CAN_BUY]) this[FETCH_CART_DATA]();
                await this[FETCH_FAVORITES_ALL]();
                this.startUnreadCheckTimer();
            } else {
                this[CLEAR_CART_DATA]();
                this[CLEAR_CHECKOUT_DATA]();
                this.stopUnreadCheckTimer();
            }
            this.startSessionTimer();
        },
    },

    async serverPrefetch() {
        try {
            await Promise.all([this[FETCH_COMMON_DATA](), this[CHECK_SESSION](true)]);
            if (this[HAS_SESSION]) {
                if (!this[USER]) await this[FETCH_USER]();
                if (this[CAN_BUY]) await this[FETCH_CART_DATA]();
                await this[FETCH_FAVORITES_ALL]();
            } else return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    },

    beforeMount() {
        this.startSessionTimer();
        if (this[HAS_SESSION]) {
            this[FETCH_UNREAD_MESSAGES]();
            this.startUnreadCheckTimer();
        }
    },

    mounted() {
        const onSetScrollDebounce = _debounce(this.onScroll, SCROLL_DEBOUNCE_TIME);
        document.addEventListener(eventName.SCROLL, onSetScrollDebounce, true);
        this.$once('hook:beforeDestroy', () => document.removeEventListener(eventName.SCROLL, onSetScrollDebounce));

        // скролл страницы до хеша при первой загрузке страницы
        if (this.$route.hash) setTimeout(this.scrollFix, 1);
        setTimeout(this.onCheckCitySelection, interval.TWO_SECONDS);
    },

    beforeDestroy() {
        this.stopSessionTimer();
    },
};
</script>
