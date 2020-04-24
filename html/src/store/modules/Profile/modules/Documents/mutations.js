export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const SET_DOCUMENTS = 'SET_DOCUMENTS';
export const SET_FILTERS = 'SET_FILTERS';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_DOCUMENTS](state, items = []) {
        state.items = items;
    },

    [SET_FILTERS](state, data = {}) {
        state.filters = data;
    },
};
