import { storeErrorHandler } from '@util/store';
import { PROMOPAGE_PRODUCTS_PAGE_SIZE } from '@constants/profile';
import { DEFAULT_PAGE } from '@constants';
import {
    getProfilePromopage,
    setProfilePromopageTitle,
    addProfilePromopageProductByCode,
    addProfilePromopageProductById,
    deleteProfilePromopageProductById,
    getProfilePromopageProducts,
} from '@api';

import { SET_PRODUCTS, SET_PRODUCTS_MORE, SET_TITLE, SET_SEARCH_RESULTS, SET_QUERY_PARAMS } from './mutations';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const FETCH_PROMOPAGE = 'FETCH_PROMOPAGE';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const SET_PROMOPAGE_TITLE = 'SET_PROMOPAGE_TITLE';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [SET_PROMOPAGE_TITLE]({ commit }, title) {
        try {
            await setProfilePromopageTitle(title);
            commit(SET_TITLE, title);
        } catch (error) {
            storeErrorHandler(SET_PROMOPAGE_TITLE)(error);
        }
    },

    async [DELETE_PRODUCT]({ dispatch }, payload = {}) {
        try {
            const { id, refresh = false } = payload;
            await deleteProfilePromopageProductById(id);
            if (refresh) dispatch(FETCH_PROMOPAGE, {});
        } catch (error) {
            storeErrorHandler(DELETE_PRODUCT)(error);
        }
    },

    async [ADD_PRODUCT]({ dispatch }, payload = {}) {
        try {
            const { id, code, refresh = false } = payload;
            if (id) await addProfilePromopageProductById(id);
            else if (code) await addProfilePromopageProductByCode(code);
            if (refresh) dispatch(FETCH_PROMOPAGE, {});
        } catch (error) {
            storeErrorHandler(ADD_PRODUCT, true)(error);
        }
    },

    async [ADD_PRODUCTS]({ dispatch }, payload = {}) {
        try {
            const { items = [], refresh = false } = payload;
            await Promise.all(items.map((i) => dispatch(ADD_PRODUCT, { code: i })));
            if (refresh) dispatch(FETCH_PROMOPAGE, {});
        } catch (error) {
            storeErrorHandler(ADD_PRODUCTS)(error);
        }
    },

    async [SEARCH_PRODUCTS]({ commit }, { query, limit = 10 }) {
        try {
            if (query) {
                const { products } = await getProfilePromopageProducts(query, limit);
                commit(SET_SEARCH_RESULTS, products);
            } else commit(SET_SEARCH_RESULTS, []);
        } catch (error) {
            storeErrorHandler(SEARCH_PRODUCTS)(error);
        }
    },

    async [FETCH_PROMOPAGE]({ commit }, { page = DEFAULT_PAGE, showMore = false }) {
        try {
            const {
                promo_page_products: items,
                promo_page_products_count: range,
                promo_page_name: title,
            } = await getProfilePromopage(page, PROMOPAGE_PRODUCTS_PAGE_SIZE);

            commit(SET_TITLE, title);
            if (showMore) commit(SET_PRODUCTS_MORE, { items, range });
            else commit(SET_PRODUCTS, { items, range });
            commit(SET_QUERY_PARAMS, { page });
        } catch (error) {
            storeErrorHandler(FETCH_PROMOPAGE, true)(error);
        }
    },
};
