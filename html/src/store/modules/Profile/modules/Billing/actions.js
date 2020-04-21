import { storeErrorHandler } from '@util/store';
import { getBillingData, getBillingOperations } from '@api';
import { BILLING_OPERATIONS_PAGE_SIZE } from '@constants/profile';

import { SET_QUERY_PARAMS, SET_OPERATIONS, SET_OPERATIONS_MORE, SET_BILLING_DATA } from './mutations';

export const FETCH_OPERATIONS = 'FETCH_OPERATIONS';
export const FETCH_STATISTICS = 'FETCH_STATISTICS';
export const FETCH_BILLING_DATA = 'FETCH_BILLING_DATA';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_BILLING_DATA]({ dispatch }, { page, showMore = false }) {
        try {
            await Promise.all([dispatch(FETCH_STATISTICS), dispatch(FETCH_OPERATIONS, { page, showMore })]);
        } catch (error) {
            storeErrorHandler(FETCH_BILLING_DATA, true)(error);
        }
    },

    async [FETCH_STATISTICS]({ commit }) {
        try {
            const data = await getBillingData();
            commit(SET_BILLING_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_STATISTICS, true)(error);
        }
    },

    async [FETCH_OPERATIONS]({ state, commit }, { page, showMore = false }) {
        try {
            const { operations: items, range } = await getBillingOperations(page, BILLING_OPERATIONS_PAGE_SIZE);

            commit(SET_QUERY_PARAMS, { page });
            if (showMore) commit(SET_OPERATIONS_MORE, { items, range });
            else commit(SET_OPERATIONS, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_OPERATIONS, true)(error);
        }
    },
};
