import { getCategories, getBanners } from '../api';
import { loadLanguageAsync } from '../plugins/i18n';
import { $logger, $progress } from '../services/ServiceLocator';

export const SET_BANNER = 'SET_BANNER';
export const SET_LOCALE = 'SET_LOCALE';
export const SET_SCROLL = 'SET_SCROLL';
export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_CART_OPEN = 'SET_CART_OPEN';
export const SET_HELP_OPEN = 'SET_HELP_OPEN';
export const SET_CITY_CONFIRMATION_OPEN = 'SET_CITY_CONFIRMATION_OPEN';
export const FETCH_COMMON_DATA = 'FETCH_COMMON_DATA';

export default {
    async [SET_LOCALE]({ commit }, payload) {
        try {
            await loadLanguageAsync(payload);
            commit(SET_LOCALE, payload);
        } catch (error) {
            $logger.error(SET_LOCALE, error);
            $progress.fail();
        }
    },

    [SET_CITY_CONFIRMATION_OPEN]({ commit }, payload) {
        commit(SET_CITY_CONFIRMATION_OPEN, payload);
    },

    [SET_CART_OPEN]({ commit }, payload) {
        commit(SET_CART_OPEN, payload);
    },

    [SET_HELP_OPEN]({ commit }, payload) {
        commit(SET_HELP_OPEN, payload);
    },

    [SET_SCROLL]({ commit }, payload) {
        commit(SET_SCROLL, payload);
    },

    [SET_MENU_OPEN]({ commit }, payload) {
        commit(SET_MENU_OPEN, payload);
    },

    [FETCH_COMMON_DATA]({ commit }, payload) {
        return Promise.all([getCategories(payload), getBanners(payload)]).then(resp => {
            commit('SET_CATEGORIES', resp[0]);
            commit('SET_BANNER', resp[1][0]);
        });
    },
};
