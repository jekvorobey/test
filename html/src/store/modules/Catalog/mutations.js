export const SET_ITEMS = 'SET_ITEMS';
export const SET_PARAMS = 'SET_PARAMS';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export default {
    SET_ITEMS(state, payload = []) {
        state.items = payload;
    },

    SET_PARAMS(state, { id, code } = {}) {
        state.categoryId = id;
        state.categoryCode = code;
    },

    SET_CATEGORIES(state, payload = []) {
        state.categories = payload;
    },
};
