export const SET_HAS_SESSION = 'SET_HAS_SESSION';

export default {
    [SET_HAS_SESSION](state, payload) {
        state.hasSession = payload;
    },
};
