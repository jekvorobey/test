export const SET_HAS_SESSION = 'SET_HAS_SESSION';
export const SET_USER = 'SET_USER';

export default {
    [SET_HAS_SESSION](state, payload) {
        state.hasSession = payload;
    },

    [SET_USER](state, payload = {}) {
        state.user = payload;
    },
};
