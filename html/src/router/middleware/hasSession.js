import { httpCodes, injectionType } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { CHECK_SESSION } from '@store/modules/Auth/actions';

export default async function hasSession({ next, container, nextMiddleware }) {
    const { dispatch } = container.get(injectionType.STORE);
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);

    try {
        const hasSession = await dispatch(`${AUTH_MODULE}/${CHECK_SESSION}`, appContext.isServer === true);
        if (!hasSession) breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
        else nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next, null, httpCodes.FORBIDDEN);
    }
}
