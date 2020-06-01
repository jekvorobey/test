import '@scripts';

import Vue from 'vue';
import { Container } from 'inversify';
import { injectionType } from '@enums';
import { injectableClass, injectClass } from '@util/container';

import ServiceLocator from '@services';

import ClientLogger from '@services/LogService/ClientLogger';
import ClientCookie from '@services/CookieService/ClientCookie';
import HttpService from '@services/HttpService/MockServiceAdapter';
import ProgressService from '@services/ProgressService';
import DadataHttpService from '@services/HttpService/DadataHttpService';
import ApplicationContext from '@services/ApplicationContext';
import RetailRocketService from '@services/RetailRocketService';

import createApp from './app/app';

// Declare as injectable and its dependencies
injectableClass(ApplicationContext);
injectableClass(ProgressService);
injectableClass(ClientLogger);
injectableClass(ClientCookie);
injectableClass(HttpService);
injectableClass(DadataHttpService);
injectableClass(RetailRocketService);

injectClass(injectionType.STORE, DadataHttpService, 0);
injectClass(injectionType.APPLICATION_CONTEXT, HttpService, 0);
injectClass(injectionType.COOKIE, HttpService, 1);

const context = new ApplicationContext();
context.baseURL = document.location.origin;
context.isServer = false;

// Declare bindings
ServiceLocator.createInstance(new Container({ skipBaseClassChecks: true }));
const { $container } = ServiceLocator;

$container.bind(injectionType.APPLICATION_CONTEXT).toConstantValue(context);
$container.bind(injectionType.PROGRESS).to(ProgressService).inSingletonScope();
$container.bind(injectionType.LOGGER).to(ClientLogger).inSingletonScope();
$container.bind(injectionType.COOKIE).to(ClientCookie).inSingletonScope();
$container.bind(injectionType.HTTP).to(HttpService).inSingletonScope();
$container.bind(injectionType.DADATA).to(DadataHttpService).inSingletonScope();
$container.bind(injectionType.RETAIL_ROCKET).to(RetailRocketService).inSingletonScope();

const { app, router, store } = createApp($container, window.__INITIAL_STATE__);

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
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
