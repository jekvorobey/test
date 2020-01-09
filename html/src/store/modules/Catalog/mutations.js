export const SET_ITEMS = 'SET_ITEMS';
export const SET_CATEGORY_CODE = 'SET_CATEGORY_CODE';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BANNER = 'SET_BANNER';
export const SET_LOAD = 'SET_LOAD';
export const SET_BRAND = 'SET_BRAND';

export default {
    [SET_LOAD](state, payload) {
        state.load = payload;
    },

    [SET_BANNER](state, payload = {}) {
        state.banner = payload;
    },

    [SET_ITEMS](state, { items, range } = { items: [], range: 0 }) {
        state.items = items || [];
        state.range = range || 0;
    },

    [SET_CATEGORY_CODE](state, payload) {
        state.categoryCode = payload;
    },

    [SET_CATEGORIES](state, payload = []) {
        state.categories = payload;
    },

    [SET_BRAND](state, payload = {}) {
        state.brandCode = payload.code;
        state.brand = payload;
    },
};
