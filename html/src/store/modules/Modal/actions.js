import { MUTATE_MODAL_STATE, MUTATE_CLOSE_ALL } from './mutations';

export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';
export const CLOSE_ALL = 'CLOSE_ALL';

export default {
    [CHANGE_MODAL_STATE]({ commit }, payload) {
        commit(MUTATE_MODAL_STATE, payload);
    },

    [CLOSE_ALL]({ commit }, payload) {
        commit(MUTATE_CLOSE_ALL, payload);
    },
};
