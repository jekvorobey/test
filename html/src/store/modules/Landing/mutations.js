export const SET_NEW_PRODUCTS = 'SET_NEW_PRODUCTS';
export const SET_BESTSELLER_PRODUCTS = 'SET_BESTSELLER_PRODUCTS';
export const SET_FEATURED_PRODUCTS = 'SET_FEATURED_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BANNERS = 'SET_BANNERS';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_INSTAGRAM = 'SET_INSTAGRAM';

export default {
    SET_INSTAGRAM(state, payload) {
        state.instagramItems = payload;
    },

    SET_BRANDS(state, payload) {
        state.brands = payload;
    },

    SET_BANNERS(state, payload) {
        state.banners = payload;
    },

    SET_NEW_PRODUCTS(state, payload) {
        state.newProducts = payload;
    },

    SET_BESTSELLER_PRODUCTS(state, payload) {
        state.bestsellerProducts = payload;
    },

    SET_FEATURED_PRODUCTS(state, payload) {
        state.featuredProducts = payload;
    },

    SET_CATEGORIES(state, payload) {
        state.categories = payload;
    },
};
