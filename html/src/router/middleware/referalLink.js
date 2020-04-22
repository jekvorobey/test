import { httpCodes, injectionType, interval, cookieNames } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { SET_SESSION_REFERRAL_CODE } from '@store/modules/Auth/actions';

export default async function referalLink({ to, next, container, nextMiddleware }) {
    try {
        const {
            query: { ref = null },
        } = to;

        if (ref) {
            const cookies = container.get(injectionType.COOKIE);
            const store = container.get(injectionType.STORE);

            // maxAge в секундах
            cookies.set(cookieNames.REFERRAL, ref, { maxAge: interval.DAY / interval.SECOND, path: '/' });
            store.dispatch(`${AUTH_MODULE}/${SET_SESSION_REFERRAL_CODE}`, ref);

            return next({
                path: to.path,
                query: { ...to.query, ref: undefined },
                replace: true,
            });
        }
        return nextMiddleware();
    } catch (error) {
        const appContext = container.get(injectionType.APPLICATION_CONTEXT);
        breakMiddleware(appContext, next, null, httpCodes.INTERNAL_SERVER_ERROR);
    }
}
