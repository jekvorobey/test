import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const FEATURED_PRODUCTS = 'featuredProducts';

export const NAME = 'featured';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [FEATURED_PRODUCTS]: [],
    },
    actions,
    mutations,
    getters,
};
