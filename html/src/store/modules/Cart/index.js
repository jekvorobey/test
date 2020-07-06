import { requestStatus } from '@enums';
import { $store } from '@services';

import actions, { ADD_CART_ITEM } from './actions';
import mutations from './mutations';
import getters, { PROMOCODE_STATUS } from './getters';

export const NAME = 'cart';
export const LOAD = 'load';
export const CART_DATA = 'cartData';
export const CART_STATUS = 'cartStatus';
export const FEATURED_PRODUCTS = 'featuredProducts';
export const RELATIVE_PRODUCTS = 'relativeProducts';

if (process.env.VUE_ENV === 'client') {
    function rrAddToBasket(offerId, count) {
        $store.dispatch(`${NAME}/${ADD_CART_ITEM}`, { offerId, count });
    }

    window.rrAddToBasket = rrAddToBasket;
}

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [LOAD]: false,
            [CART_STATUS]: {
                [PROMOCODE_STATUS]: requestStatus.SUCCESS,
            },
            [CART_DATA]: {},
            [RELATIVE_PRODUCTS]: [],
            [FEATURED_PRODUCTS]: [],
        },
        actions,
        mutations,
        getters,
    };
}
