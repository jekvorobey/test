export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';

export default {
    [SET_CART_ITEMS](state, payload = []) {
        state.cartItems = payload;
    },

    [SET_FEATURED_PRODUCTS](state, payload = []) {
        state.featuredProducts = payload;
    },
};
