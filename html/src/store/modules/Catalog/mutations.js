export const SET_FILTERS = 'SET_FILTERS';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ITEMS_MORE = 'SET_ITEMS_MORE';
export const SET_BRAND_CODE = 'SET_BRAND_CODE';
export const SET_CATEGORY_CODE = 'SET_CATEGORY_CODE';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BANNER = 'SET_BANNER';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const SET_BRAND = 'SET_BRAND';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_BANNER](state, payload = {}) {
        state.banner = payload;
    },

    [SET_ITEMS_MORE](state, { items, range }) {
        state.items.push(...items);
        state.range = range || 0;
    },

    [SET_ITEMS](state, { items, range }) {
        state.items = items;
        state.range = range || 0;
    },

    [SET_CATEGORY_CODE](state, payload) {
        state.categoryCode = payload;
    },

    [SET_BRAND_CODE](state, payload) {
        state.brandCode = payload;
    },

    [SET_CATEGORIES](state, payload = []) {
        state.categories = payload;
    },

    [SET_BRAND](state, payload = {}) {
        state.brand = payload;
    },

    [SET_FILTERS](state, payload = []) {
        state.filters = payload;
    },
};
