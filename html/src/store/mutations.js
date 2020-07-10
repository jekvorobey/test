export const SET_LOCALE = 'SET_LOCALE';
export const ADD_LOCALIZATION = 'ADD_LOCALIZATION';
export const SET_SCROLL = 'SET_SCROLL';
export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_CITY_CONFIRMATION_OPEN = 'SET_CITY_CONFIRMATION_OPEN';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BANNER = 'SET_BANNER';
export const SET_MENU = 'SET_MENU';
export const SET_FREQUENT_CATEGOIRES = 'SET_FREQUENT_CATEGOIRES';
export const SET_BADGES = 'SET_BADGES';

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

    [SET_CITY_CONFIRMATION_OPEN](state, payload) {
        state.isCityConfirmationOpen = payload;
    },

    [SET_SCROLL](state, payload) {
        state.scroll = payload;
    },

    [SET_CATEGORIES](state, payload) {
        state.categories = payload;
    },

    [SET_FREQUENT_CATEGOIRES](state, payload) {
        state.frequentCategories = payload;
    },

    [SET_BANNER](state, payload) {
        state.banner = payload;
    },

    [SET_MENU](state, payload) {
        state.menu = payload;
    },

    [SET_BADGES](state, payload = []) {
        state.badges = payload;
    },
};
