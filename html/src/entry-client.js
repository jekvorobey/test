import { injectionType } from './assets/scripts/enums';
import { Container } from 'inversify';
import { injectableClass, injectClass } from './util/container';

import ServiceLocator from './services/ServiceLocator';

import ClientLogger from './services/LogService/ClientLogger';
import ClientCookie from './services/CookieService/ClientCookie';
import HttpService from './services/HttpService/MockServiceAdapter';
import ProgressService from './services/ProgressService';
import DadataHttpService from './services/HttpService/DadataHttpService';
import ApplicationContext from './services/ApplicationContext';

import createApp from './app/app';

// Declare as injectable and its dependencies
injectableClass(ApplicationContext);
injectableClass(ProgressService);
injectableClass(ClientLogger);
injectableClass(ClientCookie);
injectableClass(HttpService);
injectableClass(DadataHttpService);

injectClass(injectionType.STORE, DadataHttpService, 0);
injectClass(injectionType.APPLICATION_CONTEXT, HttpService, 0);
injectClass(injectionType.COOKIE, HttpService, 1);

const context = new ApplicationContext();
context.baseURL = document.location.origin;

// Declare bindings
ServiceLocator.createInstance(new Container({ skipBaseClassChecks: true }));
const { $container } = ServiceLocator;

$container.bind(injectionType.APPLICATION_CONTEXT).toConstantValue(context);
$container
    .bind(injectionType.PROGRESS)
    .to(ProgressService)
    .inSingletonScope();
$container
    .bind(injectionType.LOGGER)
    .to(ClientLogger)
    .inSingletonScope();
$container
    .bind(injectionType.COOKIE)
    .to(ClientCookie)
    .inSingletonScope();
$container
    .bind(injectionType.HTTP)
    .to(HttpService)
    .inSingletonScope();
$container
    .bind(injectionType.DADATA)
    .to(DadataHttpService)
    .inSingletonScope();

const { app, router, store } = createApp($container);

router.onReady(() =>
    // actually mount to DOM
    app.$mount('#app')
);

// // service worker
// if (navigator.serviceWorker) navigator.serviceWorker.register('/service-worker.js');
