export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const APPLY_DATA = 'APPLY_DATA';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [APPLY_DATA](state, data) {
        Object.assign(state, data);
    },
};
