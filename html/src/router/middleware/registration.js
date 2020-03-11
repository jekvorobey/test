import { httpCodes } from '../../assets/scripts/enums/general';
import {} from '../../util/router';

import { NAME as MODAL_MODULE } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

export default async function registration({ to, next, store, appContext, nextMiddleware }) {
    try {
        const {
            query: { registration = null },
        } = to;

        if (registration) {
            store.dispatch(`${MODAL_MODULE}/${CHANGE_MODAL_STATE}`, { name: 'registration-modal', open: true });
            const redirect = {
                path: to.path,
                query: { ...to.query, registration: undefined },
                replace: true,
            };
            next(redirect);
        }
        return nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.INTERNAL_SERVER_ERROR);
    }
}
