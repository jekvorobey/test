import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'search';
export const SEARCH = 'search';
export const SEARCH_STRING = 'searchString';
export const POPULAR_PRODUCTS = 'popularProducts';
export const SUGGESTIONS = 'suggestions';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [SEARCH]: false,
            [SEARCH_STRING]: '',
            [SUGGESTIONS]: {
                products: [],
                categories: [],
            },
            [POPULAR_PRODUCTS]: [],
        },
        actions,
        mutations,
        getters,
    };
}
