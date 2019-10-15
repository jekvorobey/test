import _debounce from 'lodash/debounce';
import { search } from '../../../api';

const debounce_Suggestion = _debounce(async (commit, payload) => {
    const resp = await search(payload);
    commit('SET_SEARCH_SUGGESTION', resp);
}, 500);

export default {
    SET_SEARCH({ commit }, payload) {
        commit('SET_SEARCH', payload);
    },

    SEARCH({ commit }, payload) {
        return debounce_Suggestion(commit, payload);
    },
};
