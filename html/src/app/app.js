import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import createStore from '../store';
import createRouter from '../router';

import i18n from '../plugins/i18n';
import media from '../plugins/media';

import titleMixin from '../util/title';
import * as filters from '../util/filters';

import App from './App.vue';

// mixin for handling title
Vue.mixin(titleMixin);

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export default function createApp() {
    // create store and router instances
    const store = createStore();
    const router = createRouter();

    /* 
       sync the router with the vuex store.
       this registers `store.state.route`

       Синхронизация стора приложения и роутера. 
       в сторе появляется модуль route для роутера
    */
    sync(store, router);

    // create the app instance.
    // here we inject the router, store and ssr context to all child components,
    // making them available everywhere as `this.$router` and `this.$store`.
    const app = new Vue({
        router,
        store,
        mq: media,
        i18n,
        render: h => h(App),
    });

    // expose the app, the router and the store.
    // note we are not mounting the app here, since bootstrapping will be
    // different depending on whether we are in a browser or on the server.
    return { app, router, store };
}
