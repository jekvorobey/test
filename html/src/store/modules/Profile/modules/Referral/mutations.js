import Vue from 'vue';

export const SET_REFERRAL_DATA = 'SET_REFERRAL_DATA';
export const SET_ORDERS = 'SET_ORDERS';
export const SET_LOAD = 'SET_LOAD';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_ORDERS](state, payload = {}) {
        state.items = payload.items || [];
        state.range = payload.range || 0;
    },

    [SET_REFERRAL_DATA](state, payload = {}) {
        state.referralData = payload;
    },
};
