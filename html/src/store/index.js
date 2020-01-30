import { injectable } from 'inversify';
import { injectionType } from '../assets/scripts/constants';
import { injectableClass, injectClass } from '../util/container';

import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import auth from './modules/Auth';
import modal from './modules/Modal';
import search from './modules/Search';
import cart from './modules/Cart';
import preview from './modules/Preview';
import featured from './modules/Featured';
import geolocation from './modules/Geolocation';

import ruLocale from '../assets/localization/ru';
import enLocale from '../assets/localization/en';

Vue.use(Vuex);
injectableClass(Vuex.Store);

const ENV = 'env';

export const IS_MENU_OPEN = 'isMenuOpen';
export const IS_HELP_OPEN = 'isHelpOpen';
export const IS_CART_OPEN = 'isCartOpen';
export const IS_CITY_CONFIRMATION_OPEN = 'isCityConfirmationOpen';
export const SCROLL = 'scroll';

export const CATEGORIES = 'categories';
export const BANNER = 'banner';
export const SELECTED_CITY = 'selectedCity';

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
            [LOCALE]: ruLocale.LOCALE,
            [FALLBACK_LOCALE]: enLocale.LOCALE,
            [LOCALIZATIONS]: {
                [ruLocale.LOCALE]: ruLocale,
                [enLocale.LOCALE]: enLocale,
            },
            [SCROLL]: false,
            [IS_MENU_OPEN]: false,
            [IS_HELP_OPEN]: false,
            [IS_CART_OPEN]: false,
            [IS_CITY_CONFIRMATION_OPEN]: false,
            [CATEGORIES]: [],
            [BANNER]: {},
            [ENV]: context.env,
        },
        getters,
        mutations,
        actions,
        modules: {
            modal,
            search,
            auth,
            cart,
            geolocation,
            preview,
            featured,
        },
    });

    container.bind(injectionType.STORE).toConstantValue(store);
}
