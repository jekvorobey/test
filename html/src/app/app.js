import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import { injectionType } from '@enums';

import createStore from '@store';
import createRouter from '@router';

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

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

    /* Подключение Sentry для vue-приложения */
    Sentry.init({
        Vue,
        dsn: process.env.NODE_ENV === 'production' ?
            'https://82da344cf71c4669bf3aa76aca01bd31@o880371.ingest.sentry.io/5849194' : '',
        integrations: [
            new BrowserTracing(),
        ],
        ignoreErrors: [
            'TypeError',
            'Object.i',
            '<unknown>',
            'a.metaInfo',
            'r.brand.is_visible',
            'window.frisbuy[n].gallery',
            'this.$el.querySelector is not a function',
            'this.$el.querySelector(".frisbuy-gallery-post")',
            'Cannot read properties of undefined (reading \'gallery\')',
            'Cannot read properties of undefined (reading \'is_visible\')',
            'null is not an object (evaluating \'t.offsetTop\')',
            'undefined is not an object (evaluating \'r.brand.is_visible\')',
        ],
        // // default 100%
        // tracesSampleRate: 1.0,
        // test 10%
        tracesSampleRate: 0.1,
        environment: "ibt-front",
        release: '1.0.0',
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
