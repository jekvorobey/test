import { DEFAULT_PAGE } from '@constants';
import { REFERRAL_ORDERS_PAGE_SIZE } from '@constants/profile';
import { storeErrorHandler } from '@util/store';

import { getReferralData, getReferralOrders, getReferralOrderDetails } from '@api';
import {
    SET_REFERRAL_DATA,
    SET_ORDERS,
    SET_ORDERS_MORE,
    SET_QUERY_PARAMS,
    SET_REFERRAL_ORDER_DETAILS,
} from './mutations';

export const FETCH_REFERRAL_DATA = 'FETCH_REFERRAL_DATA';
export const FETCH_STATISTICS = 'FETCH_STATISTICS';
export const FETCH_REFERRER_ORDER_DETAILS = 'FETCH_REFERRER_ORDER_DETAILS';
export const FETCH_ORDERS = 'FETCH_ORDERS';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_STATISTICS]({ commit }, isServer) {
        try {
            const data = await getReferralData();
            commit(SET_REFERRAL_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_STATISTICS)(error);
        }
    },

    async [FETCH_REFERRER_ORDER_DETAILS]({ commit }, id) {
        try {
            const data = await getReferralOrderDetails(id);
            commit(SET_REFERRAL_ORDER_DETAILS, data);
        } catch (error) {
            storeErrorHandler(FETCH_REFERRER_ORDER_DETAILS)(error);
        }
    },

    async [FETCH_ORDERS]({ commit }, { page = DEFAULT_PAGE, orderField, orderDirection, showMore, orderFilterField, date }) {
        try {
            const { orders: items, count: range } = await getReferralOrders(
                page,
                REFERRAL_ORDERS_PAGE_SIZE,
                orderField,
                orderDirection,
                date,
            );

            commit(SET_QUERY_PARAMS, {
                page,
                orderField,
                orderDirection,
                orderFilterField,
            });



            if (showMore) commit(SET_ORDERS_MORE, { items, range });
            else commit(SET_ORDERS, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS)(error);
        }
    },

    async [FETCH_REFERRAL_DATA]({ dispatch, commit }, { page = DEFAULT_PAGE, orderField, orderDirection, orderFilterField, date }) {
        try {
            await Promise.all([
                dispatch(FETCH_STATISTICS),
                dispatch(FETCH_ORDERS, { page, orderField, orderDirection, orderFilterField, date }),
            ]);
        } catch (error) {
            storeErrorHandler(FETCH_REFERRAL_DATA, true)(error);
        }
    },
};
