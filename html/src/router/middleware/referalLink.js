import { httpCodes, injectionType, interval } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

export default async function referalLink({ to, next, container, nextMiddleware }) {
    try {
        const {
            query: { ref = null },
        } = to;

        if (ref) {
            const cookies = container.get(injectionType.COOKIE);
            cookies.set('referal', ref, { maxAge: 60 * 60 * 24, path: '/' });

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
