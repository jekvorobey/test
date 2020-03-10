import axios from 'axios';
import { getMenu, getCategories, getBanners, getBannersByCode } from '../api';
import { $logger, $locale } from '../services/ServiceLocator';
import { storeErrorHandler } from '../util/store';

import { SET_CATEGORIES, SET_MENU, SET_BANNER } from './mutations';

const FETCH_BANNER = 'FETCH_BANNER';
const FETCH_MENU = 'FETCH_MENU';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const FETCH_COMMON_DATA = 'FETCH_COMMON_DATA';

export const SET_LOCALE = 'SET_LOCALE';
export const ADD_LOCALIZATION = 'ADD_LOCALIZATION';
export const SET_SCROLL = 'SET_SCROLL';
export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_CITY_CONFIRMATION_OPEN = 'SET_CITY_CONFIRMATION_OPEN';

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

    [SET_SCROLL]({ commit }, payload) {
        commit(SET_SCROLL, payload);
    },

    [SET_MENU_OPEN]({ commit }, payload) {
        commit(SET_MENU_OPEN, payload);
    },

    [SET_MENU_OPEN]({ commit }, payload) {
        commit(SET_MENU_OPEN, payload);
    },

    async [FETCH_BANNER]({ commit }) {
        try {
            const data = await getBannersByCode('header', true);
            commit(SET_BANNER, data[0] || {});
        } catch (error) {
            storeErrorHandler(FETCH_BANNER)(error);
        }
    },

    async [FETCH_CATEGORIES]({ commit }) {
        try {
            const data = await getCategories(undefined, 1);
            commit(SET_CATEGORIES, data);
        } catch (error) {
            storeErrorHandler(FETCH_CATEGORIES)(error);
        }
    },

    async [FETCH_MENU]({ commit }) {
        try {
            const data = await getMenu();
            commit(SET_MENU, data);
        } catch (error) {
            storeErrorHandler(FETCH_MENU)(error);
        }
    },

    async [FETCH_COMMON_DATA]({ dispatch }, payload) {
        try {
            await Promise.all([dispatch(FETCH_MENU), dispatch(FETCH_CATEGORIES), dispatch(FETCH_BANNER)]);
        } catch (error) {
            storeErrorHandler(FETCH_COMMON_DATA)(error);
        }
    },
};
