import { cancelRoute } from '@settings';
import { externalUrl } from '@regex';

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
    };
}

export function createNotFoundProductRoute(route) {
    return {
        name: 'NotFoundProduct',
        params: [route.path],
        query: { ...route.query },
        hash: route.hash,
    };
}

export function isSelectorValid(selector) {
    try {
        document.querySelector(selector);
        return true;
    } catch {
        return false;
    }
}

export function isExternalUrl(str) {
    return externalUrl.test(str);
}
