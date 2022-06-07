import { httpCodes } from '@enums';
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
    getProfilePromopageItemsIds,
} from '@api';

import {
    SET_PRODUCTS,
    SET_PRODUCTS_MORE,
    SET_TITLE,
    SET_SEARCH_RESULTS,
    SET_QUERY_PARAMS,
    SET_ITEMS_IDS,
} from './mutations';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const FETCH_PROMOPAGE = 'FETCH_PROMOPAGE';
export const FETCH_PROMOPAGE_DATA = 'FETCH_PROMOPAGE_DATA';
export const FETCH_ITEMS_IDS = 'FETCH_ITEMS_IDS';

export const SET_PROMOPAGE_TITLE = 'SET_PROMOPAGE_TITLE';

export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

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
            if (refresh) dispatch(FETCH_PROMOPAGE_DATA, {});
        } catch (error) {
            storeErrorHandler(DELETE_PRODUCT)(error);
        }
    },

    async [ADD_PRODUCT]({ dispatch }, payload = {}) {
        const { id, link, refresh = false, bubbleOnError = true } = payload;

        try {
            if (id) await addProfilePromopageProductById(id);
            else if (link) {
                const match = link.match(/https?:\/\/[^/]+\/product\/([^/]+)\/?/);

                if (match[1]) {
                    await addProfilePromopageProductByCode(match[1]);
                }
            }
            if (refresh) dispatch(FETCH_PROMOPAGE_DATA, {});
        } catch (error) {
            storeErrorHandler(ADD_PRODUCT, bubbleOnError)(error);
            if (error.status === httpCodes.NOT_FOUND) return link;
        }
    },

    async [ADD_PRODUCTS]({ dispatch }, payload = {}) {
        try {
            const { links = [], refresh = false } = payload;

            const promises = links.map((i) => {
                return dispatch(ADD_PRODUCT, { link: i.ref, bubbleOnError: false });
            });
            let errorLinks = await Promise.all(promises);
            errorLinks = errorLinks.filter((l) => !!l);

            if (refresh) dispatch(FETCH_PROMOPAGE_DATA, {});
            if (errorLinks.length > 0)
                throw new Error({
                    errorLinks,
                    message: 'Something went wrong or not found',
                    isCancel: false,
                });
        } catch (error) {
            storeErrorHandler(ADD_PRODUCTS, true)(error);
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

    async [FETCH_ITEMS_IDS]({ commit }) {
        try {
            const data = await getProfilePromopageItemsIds();
            commit(SET_ITEMS_IDS, data);
        } catch (error) {
            storeErrorHandler(FETCH_ITEMS_IDS)(error);
        }
    },

    [FETCH_PROMOPAGE_DATA]({ dispatch }, payload) {
        return Promise.all([dispatch(FETCH_ITEMS_IDS), dispatch(FETCH_PROMOPAGE, payload)]);
    },
};
