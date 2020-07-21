import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'search';
export const SEARCH = 'search';
export const SEARCH_STRING = 'searchString';
export const POPULAR_PRODUCTS = 'popularProducts';
export const SUGGESTIONS = 'suggestions';
export const POPULAR_REQUESTS = 'popularRequests';
export const PRELOADER = 'preloader';

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
            [POPULAR_REQUESTS]: [],
            [PRELOADER]: false,
        },
        actions,
        mutations,
        getters,
    };
}
