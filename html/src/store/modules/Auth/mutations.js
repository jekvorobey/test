export const SET_HAS_SESSION = 'SET_HAS_SESSION';
export const SET_USER = 'SET_USER';

export const SET_REFERRER_CODE = 'SET_REFERRER_CODE';

export default {
    [SET_HAS_SESSION](state, payload) {
        state.hasSession = payload;
    },

    [SET_USER](state, payload = null) {
        state.user = payload;
    },

    [SET_REFERRER_CODE](state, payload) {
        state.user.referralCode = payload;
    },
};
