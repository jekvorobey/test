export const SET_CART_DATA = 'SET_CART_DATA';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_RELATIVE_PRODUCTS = 'SET_RELATIVE_PRODUCTS';

export default {
    [SET_CART_DATA](state, payload = {}) {
        state.cartData = payload;
    },

    [SET_FEATURED_PRODUCTS](state, payload = []) {
        state.featuredProducts = payload;
    },

    [SET_RELATIVE_PRODUCTS](state, payload = []) {
        state.relativeProducts = payload;
    },
};
