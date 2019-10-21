export const SET_PRODUCT = 'SET_PRODUCT';

export default {
    [SET_PRODUCT](state, payload) {
        state.product = payload;
    },
};
