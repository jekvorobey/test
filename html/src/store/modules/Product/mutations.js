export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_BANNERS = 'SET_BANNERS';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_INSTAGRAM_ITEMS = 'SET_INSTAGRAM_ITEMS';

export default {
    [SET_PRODUCT](state, payload = {}) {
        state.productCode = payload.code;
        state.product = payload;
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
