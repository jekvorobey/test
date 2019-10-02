export const SET_NEW_PRODUCTS = 'SET_NEW_PRODUCTS';
export const SET_BESTSELLER_PRODUCTS = 'SET_BESTSELLER_PRODUCTS';

export default {
    SET_NEW_PRODUCTS(state, payload) {
        state.newProducts = payload;
    },

    SET_BESTSELLER_PRODUCTS(state, payload) {
        state.bestsellerProducts = payload;
    },
};
