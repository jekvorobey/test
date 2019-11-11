export const SET_CART_DATA = 'SET_CART_DATA';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';

export default {
    [SET_CART_DATA](state, payload = { items: [] }) {
        state.cartItems = payload.items || [];
    },

    [SET_FEATURED_PRODUCTS](state, payload = []) {
        state.featuredProducts = payload;
    },
};
