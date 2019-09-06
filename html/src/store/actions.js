import { loadLanguageAsync } from '../plugins/i18n';

export default {
    SET_LOCALE({ commit }, payload) {
        loadLanguageAsync(payload).then(() => {
            commit('SET_LOCALE', payload);
        });
    },

    SET_SCROLL({ commit }, payload) {
        commit('SET_SCROLL', payload);
    },
};
