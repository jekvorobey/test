export const SET_PRODUCT_PREVIEW = 'SET_PRODUCT_PREVIEW';

export default {
    [SET_PRODUCT_PREVIEW](state, payload) {
        state.productPreview = payload;
    },
};
