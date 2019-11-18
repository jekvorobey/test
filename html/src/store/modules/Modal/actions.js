import { MUTATE_MODAL_STATE } from './mutations';

export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';

export default {
    [CHANGE_MODAL_STATE]({ commit }, payload) {
        commit(MUTATE_MODAL_STATE, payload);
    },
};
