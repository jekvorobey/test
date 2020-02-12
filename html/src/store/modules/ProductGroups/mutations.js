export const SET_ITEMS = 'SET_ITEMS';
export const SET_ITEMS_MORE = 'SET_ITEMS_MORE';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const SET_TYPE = 'SET_TYPE';

export default {
    [SET_LOAD_PATH](state, payload) {
        state.loadPath = payload;
    },

    [SET_ITEMS_MORE](state, { items, range }) {
        state.items.push(...items);
        state.range = range || 0;
    },

    [SET_ITEMS](state, { items, range }) {
        state.items = items;
        state.range = range || 0;
    },

    [SET_TYPE](state, payload) {
        state.type = payload;
    },
};
