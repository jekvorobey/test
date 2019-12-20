import { serviceName } from './assets/scripts/constants';
import createApp from './app/app';
import ServiceLocator from './services/ServiceLocator';
import ClientLogger from './services/LogService/ClientLogger';
import ClientCookie from './services/CookieService/ClientCookie';
import HttpService from './services/HttpService/MockServiceAdapter';
import events from './services/EventService';
import progress from './services/ProgressService';
import DadataHttpService from './services/HttpService/DadataHttpService';

const locator = ServiceLocator.createInstance()
    .register(serviceName.PROGRESS, () => progress)
    .register(serviceName.EVENTS, () => events)
    .register(serviceName.LOGGER, () => new ClientLogger())
    .register(serviceName.COOKIE, () => new ClientCookie())
    .register(serviceName.HTTP, () => new HttpService(document.location.origin));

const { app, router, store } = createApp(locator);

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
    // Вставляем данные в стор
    store.replaceState(window.__INITIAL_STATE__);
    locator.register(
        serviceName.DADATA,
        () => new DadataHttpService(store.state.env.DADATA_API_HOST, store.state.env.DADATA_API_KEY)
    );

    // удаляем тег скрипта с данными, и чистим их в переменной
    const appEl = document.getElementById('app');
    appEl.parentElement.removeChild(appEl.nextElementSibling);
    delete window.__INITIAL_STATE__;
}

router.onReady(() =>
    // actually mount to DOM
    app.$mount('#app')
);

// // service worker
// if (navigator.serviceWorker) navigator.serviceWorker.register('/service-worker.js');
