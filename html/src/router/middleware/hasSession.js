import { breakMiddleware } from '@util/router';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { CHECK_SESSION } from '@store/modules/Auth/actions';
import { httpCodes } from '@enums/general';

export default async function hasSession({ next, store: { dispatch }, appContext, nextMiddleware }) {
    try {
        const hasSession = await dispatch(`${AUTH_MODULE}/${CHECK_SESSION}`, appContext.isServer === true);
        if (!hasSession) breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
        else nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
    }
}
