export const SET_FILTERS = 'SET_FILTERS';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ITEMS_MORE = 'SET_ITEMS_MORE';
export const SET_BRAND_CODE = 'SET_BRAND_CODE';
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

    [SET_ITEMS_MORE](state, page) {
        state.items.push(page);
        state.range = page.range || 0;
    },

    [SET_ITEMS](state, page) {
        state.items = [page];
        state.range = page.range || 0;
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
