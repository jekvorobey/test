import axios from 'axios';
import { getMenu, getCategories, getBanners } from '../api';
import { $logger, $locale } from '../services/ServiceLocator';
import { storeErrorHandler } from '../util/store';

import { SET_CATEGORIES, SET_MENU } from './mutations';

export const SET_BANNER = 'SET_BANNER';
export const SET_LOCALE = 'SET_LOCALE';
export const ADD_LOCALIZATION = 'ADD_LOCALIZATION';
export const SET_SCROLL = 'SET_SCROLL';
export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_CART_OPEN = 'SET_CART_OPEN';
export const SET_HELP_OPEN = 'SET_HELP_OPEN';
export const SET_PROFILE_PANEL_OPEN = 'SET_PROFILE_PANEL_OPEN';
export const SET_CITY_CONFIRMATION_OPEN = 'SET_CITY_CONFIRMATION_OPEN';
export const FETCH_COMMON_DATA = 'FETCH_COMMON_DATA';

function loadLanguageAsync(lang) {
    return import(/* webpackChunkName: "lang-[request]" */ `../assets/localization/${lang}`);
}

export default {
    async [SET_LOCALE]({ commit, state }, payload) {
        try {
            if (!state.localizations[payload]) {
                const localization = await loadLanguageAsync(payload);
                commit(ADD_LOCALIZATION, localization);
            }
            commit(SET_LOCALE, payload);
            axios.defaults.headers.common['Accept-Language'] = payload;
            $locale.$i18n.locale = payload;
            document.querySelector('html').setAttribute('lang', payload);
        } catch (error) {
            $logger.error(SET_LOCALE, error);
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

    [SET_PROFILE_PANEL_OPEN]({ commit }, payload) {
        commit(SET_PROFILE_PANEL_OPEN, payload);
    },

    [SET_SCROLL]({ commit }, payload) {
        commit(SET_SCROLL, payload);
    },

    [SET_MENU_OPEN]({ commit }, payload) {
        commit(SET_MENU_OPEN, payload);
    },

    async [FETCH_COMMON_DATA]({ commit }, payload) {
        try {
            const resp = await Promise.all([getCategories(payload, 1), getBanners(payload), getMenu()]);
            commit(SET_CATEGORIES, resp[0]);
            commit(SET_BANNER, resp[1][0]);
            commit(SET_MENU, resp[2]);
        } catch (error) {
            storeErrorHandler(FETCH_COMMON_DATA)(error);
        }
    },
};
