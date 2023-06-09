import { injectionType } from '@enums';
import { breakMiddleware } from '@util/router';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { CART_ITEMS_COUNT } from '@store/modules/Cart/getters';
import { FETCH_CART_DATA } from '@store/modules/Cart/actions';

export default async function isCartEmpty({ next, container, nextMiddleware }) {
    const { dispatch, getters } = container.get(injectionType.STORE);
    const appContext = container.get(injectionType.APPLICATION_CONTEXT);

    try {
        if (appContext.isServer) await dispatch(`${CART_MODULE}/${FETCH_CART_DATA}`);
        const itemsCount = getters[`${CART_MODULE}/${CART_ITEMS_COUNT}`];
        if (itemsCount === 0) breakMiddleware(appContext, next);
        else nextMiddleware();
    } catch (error) {
        breakMiddleware(appContext, next);
    }
}
