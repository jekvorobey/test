export const SET_PRODUCT = 'SET_PRODUCT';
export const SET_BANNERS = 'SET_BANNERS';
export const SET_MASTERCLASSES = 'SET_MASTERCLASSES';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_INSTAGRAM_ITEMS = 'SET_INSTAGRAM_ITEMS';

export default {
    [SET_FEATURED_PRODUCTS](state, payload = []) {
        state.featuredProducts = payload;
    },
};
