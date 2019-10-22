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

import VHeader from '../components/VHeader/VHeader.vue';
import VFooter from '../components/VFooter/VFooter.vue';

import _debounce from 'lodash/debounce';
import { MIN_SCROLL_VALUE, eventName } from '../assets/scripts/constants';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'app',
    components: {
        VHeader,
        VFooter,
    },

    computed: {
        ...mapState(['scroll']),
    },

    methods: {
        ...mapActions(['SET_SCROLL']),

        onScroll() {
            this.SET_SCROLL(
                document.body.scrollTop > MIN_SCROLL_VALUE || document.documentElement.scrollTop > MIN_SCROLL_VALUE
            );
        },
    },

    mounted() {
        const onSetScrollDebounce = _debounce(this.onScroll, 20);
        document.addEventListener(eventName.SCROLL, onSetScrollDebounce, true);
        this.$on('hook:beforeDestroy', () => document.removeEventListener(eventName.SCROLL, onSetScrollDebounce));
    },
};
</script>



