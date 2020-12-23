import { injectable } from 'inversify';
import { injectionType } from '@enums';
import { injectableClass, injectClass } from '@util/container';

import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import auth from './modules/Auth';
import modal from './modules/Modal';
import search from './modules/Search';
import cart from './modules/Cart';
import checkout from './modules/Checkout';
import preview from './modules/Preview';
import featured from './modules/Featured';
import geolocation from './modules/Geolocation';
import favorites from './modules/Favorites';
import reviews from './modules/Reviews';

import ruLocale from '../assets/localization/ru';
import enLocale from '../assets/localization/en';

Vue.use(Vuex);
injectableClass(Vuex.Store);

const ENV = 'env';

export const MENU = 'menu';

export const IS_MENU_OPEN = 'isMenuOpen';
export const IS_CITY_CONFIRMATION_OPEN = 'isCityConfirmationOpen';
export const SCROLL = 'scroll';

export const CATEGORIES = 'categories';
export const FREQUENT_CATEGORIES = 'frequentCategories';
export const RECENTLY_VIEWED_PRODUCTS = 'recentlyViewedProducts';
export const BANNER = 'banner';

export const LOCALIZATIONS = 'localizations';
export const LOCALE = 'locale';
export const FALLBACK_LOCALE = 'fallbackLocale';

/**
 * Function for create store instance.
 * Функция создания экземпляра стора.
 */
export default function createStore(container) {
    const context = container.get(injectionType.APPLICATION_CONTEXT);

    const store = new Vuex.Store({
        strict: process.env.NODE_ENV !== 'production',
        state: {
            [ENV]: context.env,

            [SCROLL]: false,
            [IS_MENU_OPEN]: false,
            [IS_CITY_CONFIRMATION_OPEN]: false,

            [MENU]: [],
            [CATEGORIES]: [],
            [FREQUENT_CATEGORIES]: [],
            [RECENTLY_VIEWED_PRODUCTS]: [],
            [BANNER]: {},

            [LOCALE]: ruLocale.LOCALE,
            [FALLBACK_LOCALE]: enLocale.LOCALE,
            [LOCALIZATIONS]: {
                [ruLocale.LOCALE]: ruLocale,
                [enLocale.LOCALE]: enLocale,
            },
        },

        getters,
        mutations,
        actions,

        modules: {
            modal: modal(),
            search: search(),
            auth: auth(),
            cart: cart(),
            checkout: checkout(),
            geolocation: geolocation(),
            preview: preview(),
            featured: featured(),
            favorites: favorites(),
            reviews: reviews(),
        },
    });

    container.bind(injectionType.STORE).toConstantValue(store);
    return store;
}
