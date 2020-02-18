import { breakMiddleware } from '../../util/router';

import { NAME as AUTH_MODULE } from '../../store/modules/Auth';
import { LOGIN_BY_SOCIAL } from '../../store/modules/Auth/actions';

export default async function socialLogin({ from, to, next, store: { state, dispatch }, appContext, resolve }) {
    try {
        const {
            params: { driver },
            query,
        } = to;

        if (appContext.isServer) {
            const url = await dispatch(`${AUTH_MODULE}/${LOGIN_BY_SOCIAL}`, { driver, query });
            breakMiddleware(appContext, next, url || '/', 301);
        } else next(false);
    } catch (error) {
        breakMiddleware(appContext, next, '/', 500);
    }
}