export const SET_FAVORITES_DATA = 'SET_FAVORITES_DATA';

export default {
    [SET_FAVORITES_DATA](state, payload = {}) {
        state.favoritesData = payload;
    }
};
