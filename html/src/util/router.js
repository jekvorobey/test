import { cancelRoute } from '@settings';

export function breakMiddleware(appContext, next, redirect, code) {
    if (appContext.isServer) {
        appContext.statusCode = code;
        appContext.redirect = redirect;
    }
    next(cancelRoute);
}

export function createNotFoundRoute(route) {
    return {
        name: 'NotFound',
        params: [route.path],
        query: { ...route.query },
        hash: route.hash,
        replace: true,
    };
}
