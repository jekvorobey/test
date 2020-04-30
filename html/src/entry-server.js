import { Container } from 'inversify';
import { injectClass, injectableClass } from '@util/container';
import { injectionType } from '@enums';

import ServiceLocator from '@services';
import ApplicationContext from '@services/ApplicationContext';
import ServerLogger from '@services/LogService/ServerLogger';
import ServerCookie from '@services/CookieService/ServerCookie';
import HttpService from '@services/HttpService/MockServiceAdapter';
import DadataHttpService from '@services/HttpService/DadataHttpService';
import MockProgressService from '@services/ProgressService/MockService';

import createApp from './app/app';

// Declare as injectable and its dependencies
injectableClass(ApplicationContext);
injectableClass(MockProgressService);
injectableClass(ServerLogger);
injectableClass(ServerCookie);
injectableClass(HttpService);
injectableClass(DadataHttpService);

injectClass(injectionType.APPLICATION_CONTEXT, ServerCookie, 0);
injectClass(injectionType.APPLICATION_CONTEXT, HttpService, 0);
injectClass(injectionType.COOKIE, HttpService, 1);
injectClass(injectionType.STORE, DadataHttpService, 0);

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default (context) => {
    return new Promise((resolve, reject) => {
        const { url, req, res, env } = context;
        const appContext = new ApplicationContext();
        appContext.env = env;
        appContext.req = req;
        appContext.res = res;
        appContext.isServer = true;
        appContext.baseURL = `${req.protocol}://${req.get('host')}`;

        // Declare bindings
        ServiceLocator.createInstance(new Container({ skipBaseClassChecks: true }));
        const { $container } = ServiceLocator;

        $container.bind(injectionType.APPLICATION_CONTEXT).toConstantValue(appContext);
        $container.bind(injectionType.PROGRESS).to(MockProgressService).inSingletonScope();
        $container.bind(injectionType.LOGGER).to(ServerLogger).inSingletonScope();
        $container.bind(injectionType.COOKIE).to(ServerCookie).inSingletonScope();
        $container.bind(injectionType.HTTP).to(HttpService).inSingletonScope();
        $container.bind(injectionType.DADATA).to(DadataHttpService).inSingletonScope();

        const { app, router, store } = createApp($container);

        // set router's location
        router.push(url);

        router.onReady((ctx) => {
            if (appContext.redirect) return reject({ code: appContext.statusCode, url: appContext.redirect });
            if (appContext.statusCode) res.status(appContext.statusCode);

            // This `rendered` hook is called when the app has finished rendering
            context.rendered = () => {
                // After the app is rendered, our store is now
                // filled with the state from our components.
                // When we attach the state to the context, and the `template` option
                // is used for the renderer, the state will automatically be
                // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
                context.state = store.state;
            };
            return resolve(app);
        }, reject);
    });
};
