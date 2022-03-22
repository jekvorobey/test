export const SET_LANDING = 'SET_LANDING';

export default {
    [SET_LANDING](state, payload = {}) {
        state.landingCode = payload.code;
        state.landing = payload;
    },
};
