import createApp from './app';
import ServiceLocator from './services/ServiceLocator';
import { ExpressLogger } from './services/LogService';
import { ExpressCookie } from './services/CookieService';

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        ServiceLocator.createInstance()
            .register('router', () => router)
            .register('store', () => store)
            .register('logger', () => new ExpressLogger())
            .register('cookie', () => new ExpressCookie(context.req, context.res));

        const { url } = context;
        const { fullPath } = router.resolve(url).route;

        if (fullPath !== url) {
            ServiceLocator.$logger().error(`full path ${fullPath} doesn't match ${url}`);
            reject({ url: fullPath });
        }

        // set router's location
        router.push(url);

        router.onReady(() => {
            // This `rendered` hook is called when the app has finished rendering
            context.rendered = () => {
                // After the app is rendered, our store is now
                // filled with the state from our components.
                // When we attach the state to the context, and the `template` option
                // is used for the renderer, the state will automatically be
                // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
                context.state = store.state;
            };

            resolve(app);
        }, reject);
    });
};
