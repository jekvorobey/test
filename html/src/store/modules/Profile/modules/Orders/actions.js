import { storeErrorHandler } from '@util/store';
import { getProfileOrders, getProfileOrder, getProfileOrderPaymentLink } from '@api';
import { ORDERS_PAGE_SIZE } from '@constants/profile';

import { SET_ORDERS, SET_ORDERS_MORE, SET_ORDER_DETAILS, SET_QUERY_PARAMS } from './mutations';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDER_DETAILS = 'FETCH_ORDER_DETAILS';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const GET_ORDER_PAYMENT_LINK = 'GET_ORDER_PAYMENT_LINK';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [GET_ORDER_PAYMENT_LINK]({ commit }, { orderId, paymentId, backUrl }) {
        try {
            return await getProfileOrderPaymentLink(orderId, paymentId, backUrl);
        } catch (error) {
            storeErrorHandler(GET_ORDER_PAYMENT_LINK)(error);
        }
    },

    async [FETCH_ORDER_DETAILS]({ commit }, id) {
        try {
            const data = await getProfileOrder(id);
            commit(SET_ORDER_DETAILS, data);
            return data.order;
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
