import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    name: 'search',
    namespaced: true,
    state: {
        search: false,
        searchString: '',
        suggestions: {
            products: [],
            categories: [],
        },
    },
    actions,
    mutations,
    getters,
};
