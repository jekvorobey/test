import { cancelRoute } from '@settings/general';

export function breakMiddleware(appContext, next, redirect, code) {
    if (appContext.isServer) {
        appContext.statusCode = code;
        appContext.redirect = redirect;
    }
    next(cancelRoute);
}
