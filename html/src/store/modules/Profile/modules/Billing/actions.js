import { DEFAULT_PAGE } from '@constants';
import { BILLING_OPERATIONS_PAGE_SIZE } from '@constants/profile';
import { cardIdentificationStatus } from '@enums/profile';
import { storeErrorHandler } from '@util/store';

import { getBillingData, getBillingOperations, postCashOut, postCashOutRequisites, createYaCard } from '@api';
import { SET_QUERY_PARAMS, SET_OPERATIONS, SET_OPERATIONS_MORE, SET_BILLING_DATA } from './mutations';

export const FETCH_OPERATIONS = 'FETCH_OPERATIONS';
export const FETCH_STATISTICS = 'FETCH_STATISTICS';
export const FETCH_BILLING_DATA = 'FETCH_BILLING_DATA';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const POST_CASH_OUT = 'POST_CASH_OUT';
export const POST_CASH_OUT_REQUISITES = 'POST_CASH_OUT_REQUISITES';
export const CREATE_CARD = 'CREATE_CARD';
export const SET_CARD_CREATION_STATUS = 'SET_CARD_CREATION_STATUS';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    [SET_SELECTED_CARD]({ commit }, payload) {
        commit(SET_SELECTED_CARD, payload);
    },

    [SET_CARD_CREATION_STATUS]({ commit }, payload) {
        commit(SET_CARD_CREATION_STATUS, payload);
    },

    async [CREATE_CARD](
        { dispatch },
        { identificationStatus, cardPanmask, cardSynonim, cardCountryCode, cardType, accountNumber }
    ) {
        try {
            if (identificationStatus === cardIdentificationStatus.SUCCESS)
                await createYaCard(cardPanmask, cardSynonim, cardCountryCode, cardType, accountNumber);
            commit(SET_CARD_CREATION_STATUS, identificationStatus);
        } catch (error) {
            storeErrorHandler(CREATE_CARD, true)(error);
        }
    },

    async [POST_CASH_OUT]({ dispatch }, { cardId, value }) {
        try {
            await postCashOut(cardId, value);
        } catch (error) {
            storeErrorHandler(POST_CASH_OUT, true)(error);
        }
    },

    async [POST_CASH_OUT_REQUISITES]({ dispatch }, { customerId, value }) {
        try {
            await postCashOutRequisites(customerId, value);
        } catch (error) {
            storeErrorHandler(POST_CASH_OUT_REQUISITES, true)(error);
        }
    },

    async [FETCH_BILLING_DATA]({ dispatch }, { page = DEFAULT_PAGE, showMore = false }) {
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
