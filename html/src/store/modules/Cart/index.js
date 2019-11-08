import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'cart';
export const CART_ITEMS = 'cartItems';
export const FEATURED_PRODUCTS = 'featuredProducts';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [CART_ITEMS]: [],
        [FEATURED_PRODUCTS]: [],
    },
    actions,
    mutations,
    getters,
};
