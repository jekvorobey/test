export const SET_PAGE_DATA = 'SET_PAGE_DATA';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_PAGE_DATA](state, payload) {
        state.pageData = payload;
    },

    [SET_LOAD_PATH](state, payload = false) {
        state.loadPath = payload;
    },
};
