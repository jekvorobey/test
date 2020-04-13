
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const SET_FAVORITES = 'SET_FAVORITES';
export const SET_FAVORITES_MORE = 'SET_FAVORITES_MORE';

export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },
    [SET_FAVORITES](state, payload = {}) {
        state.favorites = payload;
    },
    [SET_FAVORITES_MORE](state, { items, range }) {
        state.favorites.push(...items);
        state.range = range || 0;
    },
    [SET_QUERY_PARAMS](state, { page = 1, orderField, orderDirection }) {
        state.activePage = Number(page);
        state.orderField = orderField;
        state.orderDirection = orderDirection;
    },
};
