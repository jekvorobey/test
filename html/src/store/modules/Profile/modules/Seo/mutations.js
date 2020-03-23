export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCTS_MORE = 'SET_PRODUCTS_MORE';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_PRODUCTS_MORE](state, { items, range }) {
        state.items.push(...items);
        state.range = range || 0;
    },

    [SET_PRODUCTS](state, { items, range }) {
        state.items = items;
        state.range = range || 0;
    },
};
