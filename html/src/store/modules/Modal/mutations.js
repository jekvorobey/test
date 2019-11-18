import Vue from 'vue';

export const MUTATE_MODAL_STATE = 'MUTATE_MODAL_STATE';

export default {
    [MUTATE_MODAL_STATE](state, { name, open, state: payloadState }) {
        const modalState = state.modals[name];
        const newState = { open, state: payloadState };
        if (modalState) Object.assign(modalState, newState);
        else Vue.set(state.modals, name, newState);
    },
};
