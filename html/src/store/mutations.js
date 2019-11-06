export const SET_LOCALE = 'SET_LOCALE';
export const SET_SCROLL = 'SET_SCROLL';
export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_BANNER = 'SET_BANNER';

export default {
    [SET_LOCALE](state, payload) {
        state.locale = payload;
    },

    [SET_MENU_OPEN](state, payload) {
        state.isMenuOpen = payload;
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
