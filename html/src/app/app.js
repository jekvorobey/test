/**
 * Basic polyfills and libs for application
 * Полифилы и базовые либы приложения
 */

import '../assets/scripts/common';
import Vue from 'vue';

import { injectionType } from '../assets/scripts/enums';
import { sync } from 'vuex-router-sync';
import createStore from '../store';
import createRouter from '../router';
import createLocalization from '../plugins/i18n';

import mq from '../plugins/media';
import '../plugins/meta';
import '../plugins/scroll-lock';
import '../plugins/observer';

import titleMixin from '../util/title';

import App from './App.vue';

// mixin for handling title
Vue.mixin(titleMixin);

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export default function createApp(container) {
    // create store and router instances
    const store = createStore(container);
    const router = createRouter(container);
    const i18n = createLocalization(container);
    const progress = container.get(injectionType.PROGRESS);

    /* 
       sync the router with the vuex store.
       this registers `store.state.route`

       Синхронизация стора приложения и роутера. 
       в сторе появляется модуль route для роутера
    */
    sync(store, router);

    // prime the store with server-initialized state.
    // the state is determined during SSR and inlined in the page markup.
    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
        // Вставляем данные в стор
        store.replaceState(window.__INITIAL_STATE__);

        // удаляем тег скрипта с данными, и чистим их в переменной
        const appEl = document.getElementById('app');
        appEl.parentElement.removeChild(appEl.nextElementSibling);
        delete window.__INITIAL_STATE__;
    }

    // create the app instance.
    // here we inject the router, store and ssr context to all child components,
    // making them available everywhere as `this.$router` and `this.$store`.
    const app = new Vue({
        router,
        store,
        mq,
        i18n,
        render: h => h(App),
    });

    // expose the app, the router and the store.
    // note we are not mounting the app here, since bootstrapping will be
    // different depending on whether we are in a browser or on the server.
    return { app, router, store };
}
