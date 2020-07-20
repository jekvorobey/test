import { httpCodes, injectionType, modalName, authMode } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { CHECK_SESSION } from '@store/modules/Auth/actions';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

export default async function registration({ to, next, container, nextMiddleware }) {
    const { dispatch } = container.get(injectionType.STORE);
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);

    try {
        const {
            query: { registration = null },
        } = to;

        if (registration) {
            const hasSession = await dispatch(`${AUTH_MODULE}/${CHECK_SESSION}`, appContext.isServer === true);
            if (hasSession)
                return next({
                    name: 'Cabinet',
                });

            dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, {
                name: modalName.general.AUTH,
                open: true,
                state: {
                    activeTab: authMode.REGISTRATION,
                },
            });

            return next({
                path: to.path,
                query: { ...to.query, registration: undefined },
                replace: true,
            });
        }
        return nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.INTERNAL_SERVER_ERROR);
    }
}
