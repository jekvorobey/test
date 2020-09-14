export const SET_LOAD = 'SET_LOAD';
export const SET_PRODUCT_PREVIEW_STATUS = 'SET_PRODUCT_PREVIEW_STATUS';
export const SET_PRODUCT_PREVIEW = 'SET_PRODUCT_PREVIEW';
export const SET_PRODUCT_OPTIONS = 'SET_PRODUCT_OPTIONS';
export const SET_CODE = 'SET_CODE';
export const SET_OFFER_ID = 'SET_OFFER_ID';

export default {
    [SET_CODE](state, payload) {
        state.code = payload;
    },

    [SET_OFFER_ID](state, payload) {
        state.offerId = payload;
    },

    [SET_PRODUCT_PREVIEW_STATUS](state, payload) {
        state.productPreviewStatus = payload;
    },

    [SET_PRODUCT_PREVIEW](state, payload) {
        state.productPreview = payload;
    },

    [SET_PRODUCT_OPTIONS](state, payload) {
        const { data = null, groupId = null } = payload || {};
        state.productOptions = data;
        state.groupId = groupId;
    },
};
