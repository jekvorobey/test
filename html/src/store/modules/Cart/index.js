import { requestStatus } from '@enums';

import actions from './actions';
import mutations from './mutations';
import getters, { PROMOCODE_STATUS } from './getters';

export const NAME = 'cart';
export const LOAD = 'load';
export const CART_DATA = 'cartData';
export const CART_STATUS = 'cartStatus';
export const FEATURED_PRODUCTS = 'featuredProducts';
export const RELATIVE_PRODUCTS = 'relativeProducts';

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
