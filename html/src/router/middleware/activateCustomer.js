import { injectionType } from '@enums';
import { createNotFoundRoute } from '@util/router';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { ACTIVATE_CUSTOMER } from '@store/modules/Auth/actions';

export default async function activateCustomer({ to, next, container }) {
    const { dispatch } = container.get(injectionType.STORE);
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);

    try {
        const {
            params: { customerId, signature },
        } = to;

        if (appContext.isServer) {
            await dispatch(`${AUTH_MODULE}/${ACTIVATE_CUSTOMER}`, { customerId, signature });

            next({ name: 'Cabinet' });
        } else next(false);
    } catch (error) {
        next(createNotFoundRoute(to));
    }
}
