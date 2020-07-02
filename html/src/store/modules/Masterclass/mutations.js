import { SET_LOAD } from '../Cart/mutations';

export const SET_MASTERCLASS = 'SET_MASTERCLASS';
export const SET_FEATURED = 'SET_FEATURED';
export const SET_INSTAGRAM_ITEMS = 'SET_INSTAGRAM_ITEMS';
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const SET_FILTERS = 'SET_FILTERS';
export const SET_ITEMS_MORE = 'SET_ITEMS_MORE';
export const SET_ITEMS = 'SET_ITEMS';

export default {
    [SET_LOAD_PATH](state, payload) {
        state.loadPath = payload;
    },

    [SET_QUERY_PARAMS](state, payload = {}) {
        const { page } = payload;
        state.activePage = page;
    },

    [SET_MASTERCLASS](state, payload = {}) {
        state.masterClassCode = payload.code;
        state.masterClass = payload;
    },

    [SET_FEATURED](state, payload = []) {
        state.featured = payload;
    },

    [SET_INSTAGRAM_ITEMS](state, payload = []) {
        state.instagramItems = payload;
    },

    [SET_ITEMS_MORE](state, payload) {
        const { items = [], range = 0 } = payload || {};
        state.items.push(...items);
        state.range = range;
    },

    [SET_ITEMS](state, payload) {
        const { items = [], range = 0 } = payload || {};
        state.items = items;
        state.range = range;
    },

    [SET_FILTERS](state, payload) {
        state.filters = payload || [];
    },
};
