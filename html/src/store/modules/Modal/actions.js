import { MUTATE_MODAL_STATE, MUTATE_CLOSE_ALL, MUTATE_MODALS_SHOW_COUNT } from './mutations';

export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';
export const CLOSE_ALL = 'CLOSE_ALL';
export const READ_MODAL_OPENING_HISTORY = 'READ_MODAL_OPENING_HISTORY';
export const SAVE_MODAL_OPENING_HISTORY = 'SAVE_MODAL_OPENING_HISTORY';

export default {
    [CHANGE_MODAL_STATE]({ commit }, payload) {
        commit(MUTATE_MODAL_STATE, payload);
    },

    [CLOSE_ALL]({ commit }, payload) {
        commit(MUTATE_CLOSE_ALL, payload);
    },

    [READ_MODAL_OPENING_HISTORY]({ commit }) {
        if (process.env.VUE_ENV === 'client' && window.localStorage.getItem('modalsShowCount')) {
            commit(MUTATE_MODALS_SHOW_COUNT, JSON.parse(window.localStorage.getItem('modalsShowCount')));
        }
    },

    [SAVE_MODAL_OPENING_HISTORY]({ commit, state }, { name, count = null }) {
        let saveCount = count;

        if (saveCount === null) {
            if (typeof state.modalsShowCount[name] !== 'undefined') {
                saveCount = state.modalsShowCount[name] + 1;
            } else {
                saveCount = 1;
            }
        }

        const modalsShowCount = {
            ...state.modalsShowCount,
            [name]: saveCount,
        };

        if (process.env.VUE_ENV === 'client') {
            window.localStorage.setItem('modalsShowCount', JSON.stringify(modalsShowCount));
            commit(MUTATE_MODALS_SHOW_COUNT, modalsShowCount);
        }
    },
};
