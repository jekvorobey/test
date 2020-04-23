import { httpCodes, injectionType, modalName } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

export default async function registration({ to, next, container, nextMiddleware }) {
    try {
        const {
            query: { registration = null },
        } = to;

        if (registration) {
            const store = container.get(injectionType.STORE);
            store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                name: modalName.general.REGISTRATION,
                open: true,
            });

            return next({
                path: to.path,
                query: { ...to.query, registration: undefined },
                replace: true,
            });
        }
        return nextMiddleware();
    } catch (error) {
        const appContext = container.get(injectionType.APPLICATION_CONTEXT);
        breakMiddleware(appContext, next, null, httpCodes.INTERNAL_SERVER_ERROR);
    }
}
