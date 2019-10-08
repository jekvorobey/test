export const SET_ITEMS = 'SET_ITEMS';
export const SET_LOAD = 'SET_LOAD';

export default {
    SET_ITEMS(state, payload) {
        state.items = payload;
    },

    SET_LOAD(state, payload) {
        state.load = payload;
    },
};
