import createApp from './app/app';
import ServiceLocator from './services/ServiceLocator';
import progress from './services/ProgressService';
import BrowserLogger from './services/LogService/BrowserLogger';
import { BrowserCookie } from './services/CookieService';
import EventService from './services/EventService';

const { app, router, store } = createApp();

ServiceLocator.createInstance()
    .register('progress', () => progress)
    .register('router', () => router)
    .register('store', () => store)
    .register('events', () => EventService)
    .register('logger', () => new BrowserLogger())
    .register('cookie', () => new BrowserCookie());

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
    // Вставляем данные в стор
    store.replaceState(window.__INITIAL_STATE__);

    // удаляем тег скрипта с данными, и чистим их в переменной
    const appEl = document.getElementById('app');
    appEl.parentElement.removeChild(appEl.nextElementSibling);
    delete window.__INITIAL_STATE__;
}

router.onReady(() =>
    // actually mount to DOM
    app.$mount('#app')
);

// service worker
if (navigator.serviceWorker) navigator.serviceWorker.register('/service-worker.js');
