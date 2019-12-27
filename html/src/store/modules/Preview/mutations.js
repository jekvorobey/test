export const SET_PRODUCT_PREVIEW = 'SET_PRODUCT_PREVIEW';
export const SET_PRODUCT_PREVIEW_STATUS = 'SET_PRODUCT_PREVIEW_STATUS';
export const SET_LOAD = 'SET_LOAD';

export default {
    [SET_PRODUCT_PREVIEW_STATUS](state, payload) {
        state.productPreviewStatus = payload;
    },

    [SET_PRODUCT_PREVIEW](state, payload) {
        state.productPreview = payload;
    },
};
