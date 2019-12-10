import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import auth from './modules/Auth';
import modal from './modules/Modal';
import search from './modules/Search';
import cart from './modules/Cart';
import geolocation from './modules/Geolocation';

Vue.use(Vuex);

export const IS_MENU_OPEN = 'isMenuOpen';
export const LOCALE = 'locale';
export const SCROLL = 'scroll';
export const CATEGORIES = 'categories';
export const BANNER = 'banner';
export const SELECTED_CITY = 'selectedCity';

/**
 * Function for create store instance.
 * Функция создания экземпляра стора.
 */
export default function createStore(env = {}) {
    return new Vuex.Store({
        strict: process.env.NODE_ENV !== 'production',
        state: {
            [LOCALE]: 'ru',
            [SCROLL]: false,
            [IS_MENU_OPEN]: false,
            [CATEGORIES]: [],
            [BANNER]: {},
            env,
        },
        getters,
        mutations,
        actions,
        modules: { modal, search, auth, cart, geolocation },
    });
}
