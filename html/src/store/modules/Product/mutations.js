export const SET_PRODUCT = 'SET_PRODUCT';

export default {
    [SET_PRODUCT](state, payload = {}) {
        state.productCode = payload.code;
        state.product = payload;
    },
};
