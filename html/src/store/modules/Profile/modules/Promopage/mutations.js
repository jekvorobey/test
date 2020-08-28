export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const SET_TITLE = 'SET_TITLE';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export const SET_ITEMS_IDS = 'SET_ITEMS_IDS';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCTS_MORE = 'SET_PRODUCTS_MORE';

export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_QUERY_PARAMS](state, { page = 1 }) {
        state.activePage = Number(page);
    },

    [SET_TITLE](state, payload) {
        state.title = payload;
    },

    [SET_SEARCH_RESULTS](state, payload) {
        state.searchItems = payload;
    },

    [SET_PRODUCTS_MORE](state, { items, range }) {
        state.items.push(...items);
        state.range = range || 0;
    },

    [SET_PRODUCTS](state, { items, range }) {
        state.items = items;
        state.range = range || 0;
    },

    [SET_ITEMS_IDS](state, payload) {
        state.itemsIds = payload || [];
    },
};
