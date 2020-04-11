export const SET_FAVORITES_DATA = 'SET_FAVORITES_DATA';
export const SET_LOAD_FAVORITES_PATH = 'SET_LOAD_FAVORITES_PATH';

export default {
    [SET_LOAD_FAVORITES_PATH](state, payload = '') {
        state.loadPath = payload;
    },
    [SET_FAVORITES_DATA](state, payload = {}) {
        state.favoritesData = payload;
    }
};
