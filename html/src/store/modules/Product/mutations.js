export const SET_REFERRER_CODE = 'SET_REFERRER_CODE';

export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_PRODUCT_OPTIONS = 'SET_PRODUCT_OPTIONS';
export const SET_PICKUP_POINTS = 'SET_PICKUP_POINTS';

export const SET_BANNERS = 'SET_BANNERS';
export const SET_MASTERCLASSES = 'SET_MASTERCLASSES';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_INSTAGRAM_ITEMS = 'SET_INSTAGRAM_ITEMS';

export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';
export const SET_SELECTED_PICKUP_POINT_TYPE = 'SET_SELECTED_PICKUP_POINT_TYPE';

export default {
    [SET_PRODUCT](state, payload = {}) {
        state.productCode = payload.code;
        state.product = payload;
    },

    [SET_PICKUP_POINTS](state, payload) {
        state.pickupPoints = payload || [];
    },

    [SET_SELECTED_PICKUP_POINT](state, { point, index }) {
        state.selectedIndex = index;
        state.selectedPickupPoint = point;
    },

    [SET_SELECTED_PICKUP_POINT_TYPE](state, payload) {
        state.selectedPickupPointType = payload;
    },

    [SET_PRODUCT_OPTIONS](state, payload = null) {
        state.productOptions = payload;
    },

    [SET_REFERRER_CODE](state, payload) {
        state.referrerCode = payload || null;
    },

    [SET_MASTERCLASSES](state, payload = []) {
        state.masterClasses = payload;
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
