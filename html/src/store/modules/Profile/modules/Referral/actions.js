import { storeErrorHandler } from '@util/store';
import { getReferralData, getReferralOrders } from '@api';
import { SET_REFERRAL_DATA } from './mutations';

export const FETCH_REFERRAL_DATA = 'FETCH_REFERRAL_DATA';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const SET_LOAD = 'SET_LOAD';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    async [FETCH_ORDERS]({ commit }, isServer) {
        try {
            const data = await getReferralOrders();
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS, true)(error);
        }
    },

    async [FETCH_REFERRAL_DATA]({ commit }, isServer) {
        try {
            const data = await getReferralData();
            commit(SET_REFERRAL_DATA, data);
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_REFERRAL_DATA, true)(error);
        }
    },
};
