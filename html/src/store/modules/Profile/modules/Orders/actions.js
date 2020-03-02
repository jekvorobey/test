import { storeErrorHandler } from '../../../../../util/store';
import { getProfileOrders } from '../../../../../api';
import { SET_ORDERS, SET_ORDERS_MORE, SET_ORDER_DETAILS } from './mutations';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDER_DETAILS = 'FETCH_ORDERS';
export const SET_LOAD = 'SET_LOAD';

const pageSize = 12;

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    async [FETCH_ORDER_DETAILS]({ commit }, isServer) {
        try {
            const data = await getProfilePreferences();
            commit(SET_ORDER_DETAILS, data);
        } catch (error) {
            storeErrorHandler(FETCH_ORDER_DETAILS, true)(error);
        }
    },

    async [FETCH_ORDERS]({ commit }, { page, orderField, orderDirection }) {
        try {
            const { orders, ordersCount } = await getProfileOrders({
                pageNum: page,
                sortDirection: orderDirection,
                sortKey: orderField,
                perPage: pageSize,
            });
            commit(SET_ORDERS, { items: orders, range: ordersCount });
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS, true)(error);
        }
    },
};
