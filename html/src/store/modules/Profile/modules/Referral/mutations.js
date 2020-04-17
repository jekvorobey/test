import Vue from 'vue';

export const SET_REFERRAL_DATA = 'SET_REFERRAL_DATA';
export const SET_LOAD = 'SET_LOAD';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_REFERRAL_DATA](state, payload = {}) {
        state.referralData = payload;
    },
};
