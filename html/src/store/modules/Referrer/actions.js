import { storeErrorHandler } from '@util/store';
import { DEFAULT_PAGE, DEFAULT_CATALOG_PAGE_SIZE } from '@constants';

import { getReferralData, getReferrerData, getReferrerProducts } from '@api';
import { SET_REFERRER_DATA, SET_ITEMS, SET_ITEMS_MORE, SET_QUERY_PARAMS } from './mutations';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const FETCH_REFERRER_DATA = 'FETCH_REFERRER_DATA';
export const FETCH_ITEMS = 'FETCH_ITEMS';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_REFERRER_DATA]({ state, dispatch, commit }, { code, page = DEFAULT_PAGE, showMore }) {
        try {
            const { referrerId } = state;
            const data = await getReferrerData(code);
            commit(SET_REFERRER_DATA, data);
            await dispatch(FETCH_ITEMS, { id: data.id, page, showMore });
        } catch (error) {
            storeErrorHandler(FETCH_REFERRER_DATA, true)(error);
        }
    },

    async [FETCH_ITEMS]({ state, commit }, { id, page = DEFAULT_PAGE, showMore = false }) {
        try {
            const { products: items, products_count: range } = await getReferrerProducts(
                id,
                page,
                DEFAULT_CATALOG_PAGE_SIZE
            );

            commit(SET_QUERY_PARAMS, { page });
            if (showMore) commit(SET_ITEMS_MORE, { items, range });
            else commit(SET_ITEMS, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_ITEMS, true)(error);
        }
    },
};
