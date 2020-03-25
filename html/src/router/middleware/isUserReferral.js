import { breakMiddleware } from '@util/router';

import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';
import { FETCH_USER } from '@store/modules/Auth/actions';
import { httpCodes } from '@enums';

export default async function isUserReferral({ next, store: { state, dispatch }, appContext, nextMiddleware }) {
    try {
        let user = state[AUTH_MODULE][USER];
        if (!user) user = await dispatch(`${AUTH_MODULE}/${FETCH_USER}`);
        if (!user[REFERRAL_PARTNER]) breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
        else nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
    }
}
