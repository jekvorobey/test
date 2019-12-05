import { MUTATE_SELECTED_CITY } from './mutations';

export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export default {
    [SET_SELECTED_CITY]({ commit }, payload) {
        commit(MUTATE_SELECTED_CITY, payload);
    },
};
