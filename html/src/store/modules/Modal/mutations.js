import Vue from 'vue';

export const MUTATE_MODAL_STATE = 'MUTATE_MODAL_STATE';
export const MUTATE_CLOSE_ALL = 'MUTATE_CLOSE_ALL';

export default {
    [MUTATE_MODAL_STATE](state, { name, open, state: payloadState }) {
        const modalState = state.modals[name];
        const newState = { open, state: payloadState };
        if (modalState) state.modals[name] = Object.assign({}, modalState, newState);
        else Vue.set(state.modals, name, newState);
    },

    [MUTATE_CLOSE_ALL](state) {
        for (const modalState of Object.values(state.modals)) modalState.open = false;
    },
};
