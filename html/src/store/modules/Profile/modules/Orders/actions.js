import { storeErrorHandler } from '../../../../../util/store';
import { getProfileOrders } from '../../../../../api';
import { SET_ORDERS, SET_ORDERS_MORE, SET_ORDER_DETAILS, SET_QUERY_PARAMS } from './mutations';
import { ORDERS_PAGE_SIZE } from '../../../../../assets/scripts/constants/profile';

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
        } catch (error) {
            storeErrorHandler(FETCH_ORDER_DETAILS, true)(error);
        }
    },

    async [FETCH_ORDERS]({ state, commit }, { page, orderField, orderDirection, showMore = false }) {
        try {
            const { orders: items, ordersCount: range } = await getProfileOrders(
                orderDirection,
                orderField,
                page,
                ORDERS_PAGE_SIZE
            );

            commit(SET_QUERY_PARAMS, { page, orderField, orderDirection });
            if (showMore) commit(SET_ORDERS_MORE, { items, range });
            else commit(SET_ORDERS, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS, true)(error);
        }
    },
};
