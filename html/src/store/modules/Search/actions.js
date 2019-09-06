import { search } from '../../../api';
import Helpers from '../../../assets/scripts/helpers';

const debounceSuggestion = Helpers.debounce(
    (commit, payload) => search(payload).then(resp => commit('SET_SEARCH_SUGGESTION', resp)),
    500
);

export default {
    SET_SEARCH({ commit }, payload) {
        commit('SET_SEARCH', payload);
    },

    SEARCH({ commit }, payload) {
        return debounceSuggestion(commit, payload);
    },
};
