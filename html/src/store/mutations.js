export const SET_LOCALE = 'SET_LOCALE';
export const ADD_LOCALIZATION = 'ADD_LOCALIZATION';
export const SET_SCROLL = 'SET_SCROLL';
export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_CART_OPEN = 'SET_CART_OPEN';
export const SET_HELP_OPEN = 'SET_HELP_OPEN';
export const SET_CITY_CONFIRMATION_OPEN = 'SET_CITY_CONFIRMATION_OPEN';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BANNER = 'SET_BANNER';

export default {
    [SET_LOCALE](state, payload) {
        state.locale = payload;
    },

    [ADD_LOCALIZATION](state, payload) {
        state.localizations = { ...state.localizations, [payload.LOCALE]: payload };
    },

    [SET_MENU_OPEN](state, payload) {
        state.isMenuOpen = payload;
    },

    [SET_CART_OPEN](state, payload) {
        state.isCartOpen = payload;
    },

    [SET_HELP_OPEN](state, payload) {
        state.isHelpOpen = payload;
    },

    [SET_CITY_CONFIRMATION_OPEN](state, payload) {
        state.isCityConfirmationOpen = payload;
    },

    [SET_SCROLL](state, payload) {
        state.scroll = payload;
    },

    [SET_CATEGORIES](state, payload) {
        state.categories = payload;
    },

    [SET_BANNER](state, payload) {
        state.banner = payload;
    },
};
