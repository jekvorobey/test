import { serviceName } from './assets/scripts/constants';
import createApp from './app/app';
import ServiceLocator from './services/ServiceLocator';
import ServerLogger from './services/LogService/ServerLogger';
import ServerCookie from './services/CookieService/ServerCookie';
import HttpService from './services/HttpService/MockServiceAdapter';
import MockProgressService from './services/ProgressService/MockService';
import DadataHttpService from './services/HttpService/DadataHttpService';

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
    return new Promise((resolve, reject) => {
        const host = `${context.req.protocol}://${context.req.get('host')}`;
        const locator = ServiceLocator.createInstance()
            .register(serviceName.PROGRESS, () => new MockProgressService())
            .register(serviceName.LOGGER, () => new ServerLogger())
            .register(serviceName.COOKIE, () => new ServerCookie(context.req, context.res))
            .register(serviceName.HTTP, () => new HttpService(host));

        const { app, router, store } = createApp(locator, context.env);

        locator.register(
            serviceName.DADATA,
            () => new DadataHttpService(store.state.env.DADATA_API_HOST, store.state.env.DADATA_API_KEY)
        );

        const { $logger } = ServiceLocator;
        const { url } = context;
        const { fullPath } = router.resolve(url).route;

        if (fullPath !== url) {
            $logger.error(`full path ${fullPath} doesn't match ${url}`);
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
