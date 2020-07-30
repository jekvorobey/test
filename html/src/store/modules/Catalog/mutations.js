export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const APPLY_DATA = 'APPLY_DATA';
const CHANGE_FILTER_STATE = 'CHANGE_FILTER_STATE';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [APPLY_DATA](state, data) {
        Object.assign(state, data);
    },

    [CHANGE_FILTER_STATE](state, { name, value }) {
        state.filtersStateMap = {
            ...state.filtersStateMap,
            [name]: value,
        };
    },
};
