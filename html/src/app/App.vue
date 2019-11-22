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
import VSticky from '../components/controls/VSticky/VSticky.vue';
import VPicture from '../components/controls/VPicture/VPicture.vue';

import VHeader from '../components/VHeader/VHeader.vue';
import VFooter from '../components/VFooter/VFooter.vue';

import '../util/catalog';
import _debounce from 'lodash/debounce';
import { SCROLL, CATEGORIES } from '../store';
import { SET_SCROLL, FETCH_COMMON_DATA } from '../store/actions';

import { NAME as CART_MODULE, CART_ITEMS } from '../store/modules/Cart';
import { FETCH_CART_DATA } from '../store/modules/Cart/actions';

import { NAME as AUTH_MODULE } from '../store/modules/Auth';
import { LOGIN } from '../store/modules/Auth/actions';

import { MIN_SCROLL_VALUE, eventName } from '../assets/scripts/constants';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'app',
    components: {
        VHeader,
        VFooter,
    },

    computed: {
        ...mapState([SCROLL]),
    },

    methods: {
        ...mapActions([SET_SCROLL, FETCH_COMMON_DATA]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA]),
        ...mapActions(AUTH_MODULE, [LOGIN]),

        onScroll() {
            this[SET_SCROLL](
                document.body.scrollTop > MIN_SCROLL_VALUE || document.documentElement.scrollTop > MIN_SCROLL_VALUE
            );
        },
    },

    serverPrefetch() {
        return Promise.all([this[FETCH_COMMON_DATA](), this[LOGIN]({ email: 'test@gs.ru', password: 123456 })]).then(
            () => this[FETCH_CART_DATA]()
        );
    },

    mounted() {
        const onSetScrollDebounce = _debounce(this.onScroll, 20);
        document.addEventListener(eventName.SCROLL, onSetScrollDebounce, true);
        this.$on('hook:beforeDestroy', () => document.removeEventListener(eventName.SCROLL, onSetScrollDebounce));
    },
};
</script>
