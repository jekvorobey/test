export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const SET_REFERRER_DATA = 'SET_REFERRER_DATA';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ITEMS_MORE = 'SET_ITEMS_MORE';
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_QUERY_PARAMS](state, { page = 1 }) {
        state.activePage = Number(page);
    },

    [SET_REFERRER_DATA](state, payload = {}) {
        const { id, name } = payload;
        state.referrerId = id;
        state.title = name;
    },

    [SET_ITEMS](state, { items = [], range }) {
        state.items = items;
        state.range = range || 0;
    },

    [SET_ITEMS_MORE](state, { items = [], range }) {
        state.items.push(...items);
        state.range = range || 0;
    },
};
