import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import modal from './modules/Modal';
import search from './modules/Search';

Vue.use(Vuex);

/**
 * Function for create store instance.
 * Функция создания экземпляра стора.
 */
export default function createStore() {
    return new Vuex.Store({
        strict: process.env.NODE_ENV !== 'production',
        state: {
            locale: 'ru',
            scroll: false,
        },
        getters,
        mutations,
        actions,
        modules: { modal, search },
    });
}
