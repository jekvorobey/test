import { serviceName } from './assets/scripts/constants';
import createApp from './app/app';
import ServiceLocator from './services/ServiceLocator';
import BrowserLogger from './services/LogService/BrowserLogger';
import BrowserCookie from './services/CookieService/BrowserCookie';
import HttpService from './services/HttpService/MockServiceAdapter';
import events from './services/EventService';
import progress from './services/ProgressService';

const { app, router, store } = createApp();

ServiceLocator.createInstance()
    .register(serviceName.PROGRESS, () => progress)
    .register(serviceName.EVENTS, () => events)
    .register(serviceName.ROUTER, () => router)
    .register(serviceName.STORE, () => store)
    .register(serviceName.LOGGER, () => new BrowserLogger())
    .register(serviceName.COOKIE, () => new BrowserCookie())
    .register(serviceName.HTTP, () => new HttpService());

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
