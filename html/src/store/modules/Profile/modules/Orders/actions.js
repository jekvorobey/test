import { DEFAULT_PAGE } from '@constants';
import { ORDERS_PAGE_SIZE } from '@constants/profile';
import { storeErrorHandler } from '@util/store';

import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';

import {
    getProfileOrdersInfo,
    getProfileOrderFilters,
    getProfileOrders,
    getProfileOrder,
    getProfileOrderPaymentLink,
    repeatOrder,
} from '@api';
import {
    SET_ORDERS_FILTERS,
    SET_ORDERS,
    SET_ORDERS_MORE,
    SET_ORDER_DETAILS,
    SET_QUERY_PARAMS,
    SET_REFERRAL_DATA,
} from './mutations';

export const FETCH_ORDERS_DATA = 'FETCH_ORDERS_DATA';
export const FETCH_STATISTICS = 'FETCH_STATISTICS';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_FILTERS = 'FETCH_ORDERS_FILTERS';
export const FETCH_ORDER_DETAILS = 'FETCH_ORDER_DETAILS';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const GET_ORDER_PAYMENT_LINK = 'GET_ORDER_PAYMENT_LINK';
export const REPEAT_ORDER = 'REPEAT_ORDER';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [GET_ORDER_PAYMENT_LINK](context, { orderId, paymentId, backUrl }) {
        try {
            return await getProfileOrderPaymentLink(orderId, paymentId, backUrl);
        } catch (error) {
            storeErrorHandler(GET_ORDER_PAYMENT_LINK, true)(error);
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

    async [FETCH_ORDERS_FILTERS]({ commit }) {
        try {
            const { items } = await getProfileOrderFilters();
            commit(SET_ORDERS_FILTERS, items);
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS_FILTERS, true)(error);
        }
    },

    async [FETCH_ORDERS]({ commit }, { page, orderField, orderDirection, showMore = false, filter }) {
        try {
            const { orders: items, ordersCount: range } = await getProfileOrders(
                orderDirection,
                orderField,
                page,
                ORDERS_PAGE_SIZE,
                filter
            );

            commit(SET_QUERY_PARAMS, { page, orderField, orderDirection });
            if (showMore) commit(SET_ORDERS_MORE, { items, range });
            else commit(SET_ORDERS, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS, true)(error);
        }
    },

    async [FETCH_STATISTICS]({ commit, rootState }) {
        try {
            const isReferral = rootState[AUTH_MODULE][USER][REFERRAL_PARTNER] || false;
            if (isReferral) {
                const data = await getProfileOrdersInfo();
                commit(SET_REFERRAL_DATA, data);
            }
        } catch (error) {
            storeErrorHandler(FETCH_STATISTICS)(error);
        }
    },

    async [FETCH_ORDERS_DATA](
        { dispatch },
        { page = DEFAULT_PAGE, orderField, orderDirection, showMore = false, filter }
    ) {
        try {
            await Promise.all([
                dispatch(FETCH_STATISTICS),
                dispatch(FETCH_ORDERS_FILTERS),
                dispatch(FETCH_ORDERS, { page, orderField, orderDirection, showMore, filter }),
            ]);
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS_DATA, true)(error);
        }
    },

    async [REPEAT_ORDER](context, id) {
        try {
            await repeatOrder(id);
        } catch (error) {
            storeErrorHandler(REPEAT_ORDER, true)(error);
        }
    },
};
