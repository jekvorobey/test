import { storeErrorHandler } from '@util/store';
import { SEO_PRODUCTS_PAGE_SIZE } from '@constants/profile';
import { getProfileSeoProducts } from '@api';

import { SET_PRODUCTS, SET_PRODUCTS_MORE } from './mutations';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_PRODUCTS]({ commit }, { page = 1, isActive = 1, showMore = false }) {
        try {
            const { promotionProducts: items, promotionProductsCount: range } = await getProfileSeoProducts(
                page,
                SEO_PRODUCTS_PAGE_SIZE,
                isActive
            );

            if (showMore) commit(SET_PRODUCTS_MORE, { items, range });
            else commit(SET_PRODUCTS, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCTS, true)(error);
        }
    },
};
