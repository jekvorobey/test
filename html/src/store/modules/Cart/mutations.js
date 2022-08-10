export const SET_CART_DATA = 'SET_CART_DATA';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_RELATIVE_PRODUCTS = 'SET_RELATIVE_PRODUCTS';
export const SET_STATUS = 'SET_STATUS';
export const SET_LOAD = 'SET_LOAD';
export const SET_LOADING_ADDING_TO_BASKET = 'SET_LOADING_ADDING_TO_BASKET';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_CART_DATA](state, payload = {}) {
        state.cartData = payload;
    },

    [SET_FEATURED_PRODUCTS](state, payload = []) {
        state.featuredProducts = payload;
    },

    [SET_RELATIVE_PRODUCTS](state, payload = []) {
        state.relativeProducts = payload;
    },

    [SET_STATUS](state, payload = {}) {
        state.cartStatus[payload.name] = payload.value;
    },

    [SET_LOADING_ADDING_TO_BASKET](state, payload) {
        state.isAddingToBasket = payload;
    },
};
