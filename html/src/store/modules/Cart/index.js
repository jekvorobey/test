import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'cart';
export const DATA = 'data';
export const FEATURED_PRODUCTS = 'featuredProducts';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [DATA]: {},
        [FEATURED_PRODUCTS]: [],
    },
    actions,
    mutations,
    getters,
};
