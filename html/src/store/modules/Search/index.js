import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const SEARCH = 'search';
export const SEARCH_STRING = 'searchString';
export const POPULAR_PRODUCTS = 'popularProducts';
export const SUGGESTIONS = 'suggestions';

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
        popularProducts: [],
    },
    actions,
    mutations,
    getters,
};
