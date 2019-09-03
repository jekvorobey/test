<template>
    <div id="app" class="fake-vue-body" :class="{ 'fake-vue-body--scroll': scroll }">
        <v-header />
        <main>
            <transition name="fade" mode="out-in">
                <router-view class="view" />
            </transition>
        </main>
        <v-footer />
    </div>
</template>

<script>
/**
 * Basic polyfills and libs for application
 * Полифилы и базовые либы приложения
 */
import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.iterator';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'custom-event-polyfill';
import 'intersection-observer';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'focus-visible';

import './App.critical.css';
import './App.css';

/**
 * Базовые компоненты страницы
 */
import VHeader from '../components/VHeader/VHeader.vue';
import VFooter from '../components/VFooter/VFooter.vue';

import { MIN_SCROLL_VALUE } from '../constants';
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
        document.addEventListener('scroll', this.onScroll);
    },

    beforeDestroy() {
        document.removeEventListener('scroll', this.onScroll);
    },
};
</script>



