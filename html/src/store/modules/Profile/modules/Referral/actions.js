import { REFERRAL_ORDERS_PAGE_SIZE } from '@constants/profile';
import { storeErrorHandler } from '@util/store';

import { getReferralData, getReferralOrders } from '@api';
import { SET_REFERRAL_DATA, SET_ORDERS, SET_QUERY_PARAMS } from './mutations';
import { DEFAULT_PAGE } from '@constants';

export const FETCH_REFERRAL_DATA = 'FETCH_REFERRAL_DATA';
export const FETCH_STATISTICS = 'FETCH_STATISTICS';
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

    async [FETCH_ORDERS]({ commit }, { page = DEFAULT_PAGE, orderField, orderDirection, showMore }) {
        try {
            const { orders: items, count: range } = await getReferralOrders(
                page,
                REFERRAL_ORDERS_PAGE_SIZE,
                orderField,
                orderDirection
            );

            commit(SET_QUERY_PARAMS, {
                page,
                orderField,
                orderDirection,
            });

            if (showMore) commit(SET_ORDERS_MORE, { items, range });
            else commit(SET_ORDERS, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_ORDERS)(error);
        }
    },

    async [FETCH_REFERRAL_DATA]({ dispatch, commit }, { page = DEFAULT_PAGE, orderField, orderDirection }) {
        try {
            await dispatch(FETCH_STATISTICS);
            await dispatch(FETCH_ORDERS, { page, orderField, orderDirection });
            //commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_REFERRAL_DATA, true)(error);
        }
    },
};
