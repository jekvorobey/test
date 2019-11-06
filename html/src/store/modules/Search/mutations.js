export const SET_SEARCH_SUGGESTION = 'SET_SEARCH_SUGGESTION';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_POPULAR_PRODUCTS = 'SET_POPULAR_PRODUCTS';
export const SET_SEARCH_STRING = 'SET_SEARCH_STRING';

export default {
    [SET_SEARCH_STRING](state, payload) {
        state.searchString = payload;
    },

    [SET_POPULAR_PRODUCTS](state, payload) {
        state.popularProducts = payload;
    },

    [SET_SEARCH_SUGGESTION](state, payload) {
        state.suggestions = payload;
    },

    [SET_SEARCH](state, payload) {
        state.search = payload;
    },
};
