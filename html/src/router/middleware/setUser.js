import { httpCodes, injectionType } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';
import { FETCH_USER } from '@store/modules/Auth/actions';

export default async function setUser({ next, container, nextMiddleware }) {
    const { dispatch, state } = container.get(injectionType.STORE);
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);

    try {
        let user = state[AUTH_MODULE][USER];
        if (!user) await dispatch(`${AUTH_MODULE}/${FETCH_USER}`);
        nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
    }
}
