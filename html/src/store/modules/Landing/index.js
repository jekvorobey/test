import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    name: 'landing',
    namespaced: true,
    state: {
        categories: [],
        newProducts: [],
        bestsellerProducts: [],
        featuredProducts: [],
    },
    actions,
    mutations,
    getters,
};
