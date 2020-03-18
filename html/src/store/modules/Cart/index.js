import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'cart';
export const CART_DATA = 'cartData';
export const FEATURED_PRODUCTS = 'featuredProducts';
export const RELATIVE_PRODUCTS = 'relativeProducts';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [CART_DATA]: {},
            [RELATIVE_PRODUCTS]: [],
            [FEATURED_PRODUCTS]: [],
        },
        actions,
        mutations,
        getters,
    };
}
