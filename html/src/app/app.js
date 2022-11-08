import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

import { injectionType } from '@enums';

import createStore from '@store';
import createRouter from '@router';

import createLocalization from '@plugins/i18n';
import mq from '@plugins/media';
import '@plugins/meta';
import '@plugins/scroll-lock';
import '@plugins/observer';
import '@plugins/sticky';
import '@plugins/focus';

import '@util';
import '@util/catalog';
import '@util/router';
import '@util/container';
import '@util/store';
import '@util/file';

import titleMixin from '@util/title';

import App from './App.vue';

// mixin for handling title
Vue.mixin(titleMixin);

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export default function createApp(container, initialState = null) {
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

    if (initialState) store.replaceState(initialState);

    Sentry.init({
        Vue,
        dsn: process.env.SENTRY_LARAVEL_DSN,
        integrations: [
            new BrowserTracing(),
        ],
        tracesSampleRate: 1.0,
    });

    // create the app instance.
    // here we inject the router, store and ssr context to all child components,
    // making them available everywhere as `this.$router` and `this.$store`.
    const app = new Vue({
        router,
        store,
        mq,
        i18n,
        render: (h) => h(App),
    });

    // expose the app, the router and the store.
    // note we are not mounting the app here, since bootstrapping will be
    // different depending on whether we are in a browser or on the server.
    return { app, router, store };
}
