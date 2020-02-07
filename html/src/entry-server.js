import { Container } from 'inversify';
import { injectionType } from './assets/scripts/enums';
import { injectClass, injectableClass } from './util/container';

import ServiceLocator from './services/ServiceLocator';
import ApplicationContext from './services/ApplicationContext';
import ServerLogger from './services/LogService/ServerLogger';
import ServerCookie from './services/CookieService/ServerCookie';
import HttpService from './services/HttpService/MockServiceAdapter';
import MockProgressService from './services/ProgressService/MockService';

import createApp from './app/app';

// Declare as injectable and its dependencies
injectableClass(ApplicationContext);
injectableClass(MockProgressService);
injectableClass(ServerLogger);
injectableClass(ServerCookie);
injectableClass(HttpService);
injectClass(injectionType.APPLICATION_CONTEXT, ServerCookie, 0);
injectClass(injectionType.APPLICATION_CONTEXT, HttpService, 0);
injectClass(injectionType.COOKIE, HttpService, 1);

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
    return new Promise((resolve, reject) => {
        const appContext = new ApplicationContext();
        appContext.env = context.env;
        appContext.req = context.req;
        appContext.res = context.res;
        appContext.baseURL = `${context.req.protocol}://${context.req.get('host')}`;

        // Declare bindings
        ServiceLocator.createInstance(new Container({ skipBaseClassChecks: true }));
        const { $container } = ServiceLocator;

        $container.bind(injectionType.APPLICATION_CONTEXT).toConstantValue(appContext);
        $container
            .bind(injectionType.PROGRESS)
            .to(MockProgressService)
            .inSingletonScope();
        $container
            .bind(injectionType.LOGGER)
            .to(ServerLogger)
            .inSingletonScope();
        $container
            .bind(injectionType.COOKIE)
            .to(ServerCookie)
            .inSingletonScope();
        $container
            .bind(injectionType.HTTP)
            .to(HttpService)
            .inSingletonScope();

        const { app, router, store } = createApp($container);
        const logger = $container.get(injectionType.LOGGER);

        const { url } = context;
        const { fullPath } = router.resolve(url).route;

        if (fullPath !== url) {
            logger.error(`full path ${fullPath} doesn't match ${url}`);
            return reject({ url: fullPath });
        }

        // set router's location
        router.push(url);

        router.onReady(ctx => {
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
