export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_PRODUCT_OPTIONS = 'SET_PRODUCT_OPTIONS';
export const SET_BANNERS = 'SET_BANNERS';
export const SET_MASTERCLASSES = 'SET_MASTERCLASSES';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_INSTAGRAM_ITEMS = 'SET_INSTAGRAM_ITEMS';

export default {
    [SET_MASTERCLASSES](state, payload = []) {
        state.masterClasses = payload;
    },

    [SET_PRODUCT](state, payload = {}) {
        state.productCode = payload.code;
        state.product = payload;
    },

    [SET_PRODUCT_OPTIONS](state, payload = null) {
        state.productOptions = payload;
    },

    [SET_BANNERS](state, payload = []) {
        state.banners = payload;
    },

    [SET_FEATURED_PRODUCTS](state, payload = []) {
        state.featuredProducts = payload;
    },

    [SET_INSTAGRAM_ITEMS](state, payload = []) {
        state.instagramItems = payload;
    },
};
