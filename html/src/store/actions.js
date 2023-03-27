import axios from 'axios';
import {
    getMenu,
    getCategories,
    getBannersByCode,
    getFrequentCategories,
    getRecentlyViewedProducts,
    getRedirects,
} from '@api';
import { $logger, $locale } from '@services';
import { storeErrorHandler } from '@util/store';
import { bannerType } from '@enums';

import {
    SET_CATEGORIES,
    SET_MENU,
    SET_BANNER,
    SET_BANNER_THROUGH,
    SET_FREQUENT_CATEGOIRES,
    SET_RECENTLY_VIEWED_PRODUCTS,
    SET_REDIRECTS,
} from './mutations';

const FETCH_MENU = 'FETCH_MENU';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const FETCH_FREQUENT_CATEGORIES = 'FETCH_FREQUENT_CATEGOIRES';

export const FETCH_COMMON_DATA = 'FETCH_COMMON_DATA';
export const FETCH_RECENTLY_VIEWED_PRODUCTS = 'FETCH_RECENTLY_VIEWED_PRODUCTS';
export const FETCH_REDIRECTS = 'FETCH_REDIRECTS';

export const FETCH_BANNER = 'FETCH_BANNER';
export const FETCH_BANNER_THROUGH = 'FETCH_BANNER_THROUGH';
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

    async [FETCH_BANNER]({ commit }, pagePath = '/') {
        try {
            const banner = await getBannersByCode(bannerType.MENU, true, pagePath);
            commit(SET_BANNER, banner || null);
        } catch (error) {
            storeErrorHandler(FETCH_BANNER)(error);
        }
    },

    async [FETCH_BANNER_THROUGH]({ commit }, pagePath = '/') {
        try {
            const bannerThrough = await getBannersByCode(bannerType.THROUGH, false, pagePath);
            commit(SET_BANNER_THROUGH, bannerThrough);
        } catch (error) {
            storeErrorHandler(FETCH_BANNER_THROUGH)(error);
        }
    },

    async [FETCH_CATEGORIES]({ commit }) {
        try {
            const data = await getCategories(undefined, 2);
            commit(SET_CATEGORIES, data);
        } catch (error) {
            storeErrorHandler(FETCH_CATEGORIES)(error);
        }
    },

    async [FETCH_FREQUENT_CATEGORIES]({ commit }) {
        try {
            const data = await getFrequentCategories(undefined, 2);
            commit(SET_FREQUENT_CATEGOIRES, data);
        } catch (error) {
            storeErrorHandler(FETCH_FREQUENT_CATEGORIES)(error);
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

    async [FETCH_REDIRECTS]({ commit }) {
        try {
            const data = await getRedirects();
            commit(SET_REDIRECTS, data);
        } catch (error) {
            storeErrorHandler(FETCH_REDIRECTS)(error);
        }
    },

    async [FETCH_RECENTLY_VIEWED_PRODUCTS]({ commit }) {
        try {
            const { items } = await getRecentlyViewedProducts();
            commit(SET_RECENTLY_VIEWED_PRODUCTS, items);
        } catch (error) {
            storeErrorHandler(FETCH_RECENTLY_VIEWED_PRODUCTS)(error);
        }
    },

    async [FETCH_COMMON_DATA]({ dispatch }) {
        try {
            await Promise.all([
                dispatch(FETCH_MENU),
                dispatch(FETCH_CATEGORIES),
                dispatch(FETCH_BANNER),
                dispatch(FETCH_FREQUENT_CATEGORIES),
            ]);
        } catch (error) {
            storeErrorHandler(FETCH_COMMON_DATA)(error);
        }
    },
};
