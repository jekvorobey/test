import { loadLanguageAsync } from '../plugins/i18n';
import { $logger, $progress } from '../services/ServiceLocator';

export default {
    async SET_LOCALE({ commit }, payload) {
        try {
            await loadLanguageAsync(payload);
            commit('SET_LOCALE', payload);
        } catch (error) {
            $logger.error('SET_LOCALE', error);
            $progress.fail();
        }
    },

    SET_SCROLL({ commit }, payload) {
        commit('SET_SCROLL', payload);
    },
};
