import { httpCodes, injectionType } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { LOGIN_BY_SOCIAL } from '@store/modules/Auth/actions';

export default async function socialLogin({ from, to, next, container }) {
    const { dispatch } = container.get(injectionType.STORE);
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);

    try {
        const {
            params: { driver },
            query,
        } = to;

        if (appContext.isServer) {
            const url = await dispatch(`${AUTH_MODULE}/${LOGIN_BY_SOCIAL}`, { driver, query });
            breakMiddleware(appContext, next, url || '/', httpCodes.FOUND);
        } else next(false);
    } catch (error) {
        breakMiddleware(appContext, next, '/', httpCodes.FOUND);
    }
}
