export const LOAD_PATH = 'LOAD_PATH';

export const SET_DOCUMENTS = 'SET_DOCUMENTS';

export default {
    [LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_DOCUMENTS](state, items) {
        state.items = items;
    },
};
