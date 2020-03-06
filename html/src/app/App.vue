<template>
    <div id="app" class="fake-vue-body" :class="{ 'fake-vue-body--scroll': scroll }">
        <v-header />
        <main>
            <!-- <transition name="fade" mode="out-in"> -->
            <router-view class="view" />
            <!-- </transition> -->
        </main>
        <v-footer />
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
import VSvg from '../components/controls/VSvg/VSvg.vue';
import VLink from '../components/controls/VLink/VLink.vue';
import VButton from '../components/controls/VButton/VButton.vue';
import VInput from '../components/controls/VInput/VInput.vue';
import VCheck from '../components/controls/VCheck/VCheck.vue';
import VSticky from '../components/controls/VSticky/VSticky.vue';
import VPicture from '../components/controls/VPicture/VPicture.vue';

import Price from '../components/Price/Price.vue';

import VHeader from '../components/VHeader/VHeader.vue';
import VFooter from '../components/VFooter/VFooter.vue';

import _debounce from 'lodash/debounce';
import { SCROLL, CATEGORIES } from '../store';
import { SET_SCROLL, FETCH_COMMON_DATA, SET_CITY_CONFIRMATION_OPEN } from '../store/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '../store/modules/Cart';
import { FETCH_CART_DATA, CLEAR_CART_DATA } from '../store/modules/Cart/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '../store/modules/Auth';
import { CHECK_SESSION, LOGIN_BY_PASSWORD } from '../store/modules/Auth/actions';

import { MIN_SCROLL_VALUE, SCROLL_DEBOUCE_TIME } from '../assets/scripts/constants/general';
import { eventName, interval } from '../assets/scripts/enums/general';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'app',

    components: {
        VHeader,
        VFooter,
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
    },

    methods: {
        ...mapActions([SET_SCROLL, FETCH_COMMON_DATA, SET_CITY_CONFIRMATION_OPEN]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA, CLEAR_CART_DATA]),
        ...mapActions(AUTH_MODULE, [CHECK_SESSION, LOGIN_BY_PASSWORD]),

        onScroll() {
            this[SET_SCROLL](
                document.body.scrollTop > MIN_SCROLL_VALUE || document.documentElement.scrollTop > MIN_SCROLL_VALUE
            );
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

        setTimeout(() => {
            this[SET_CITY_CONFIRMATION_OPEN](true);
        }, interval.TWO_SECONDS);
    },

    beforeDestroy() {
        this.stopSessionTimer();
    },
};
</script>
