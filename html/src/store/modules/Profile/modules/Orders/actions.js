import { storeErrorHandler } from '../../../../../util/store';
import { getProfilePreferences, changeProfilePreferences } from '../../../../../api';
import { SET_ORDERS, SET_ORDERS_MORE, SET_ORDER_DETAILS } from './mutations';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDER_DETAILS = 'FETCH_ORDERS';
export const SET_LOAD = 'SET_LOAD';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    async [FETCH_ORDER_DETAILS]({ commit }, isServer) {
        try {
            const data = await getProfilePreferences();
            commit(SET_ORDER_DETAILS, data);
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS_DATA, true)(error);
        }
    },

    async [FETCH_ORDERS]({ commit }, isServer) {
        try {
            const data = await getProfilePreferences();
            commit(SET_ORDERS, data);
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS_DATA, true)(error);
        }
    },
};
