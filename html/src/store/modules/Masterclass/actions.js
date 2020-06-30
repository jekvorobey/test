import { DEFAULT_PAGE } from '@constants';
import { sortDirections } from '@enums';
import { storeErrorHandler } from '@util/store';
import { getInstagram, getMasterclasses, getMasterclass, getCatalogMasterclasses } from '@api';
import {
    SET_MASTERCLASS,
    SET_FEATURED,
    SET_INSTAGRAM_ITEMS,
    SET_ITEMS,
    SET_ITEMS_MORE,
    SET_QUERY_PARAMS,
} from './mutations';

export const FETCH_MASTERCLASS_CATALOG_DATA = 'FETCH_MASTERCLASS_CATALOG_DATA';
export const FETCH_MASTERCLASS_ITEMS = 'FETCH_MASTERCLASS_ITEMS';

export const FETCH_MASTERCLASS_DATA = 'FETCH_MASTERCLASS_DATA';
export const FETCH_INSTAGRAM_ITEMS = 'FETCH_INSTAGRAM_ITEMS';
export const FETCH_MASTERCLASS = 'FETCH_MASTERCLASS';
export const FETCH_FEATURED = 'FETCH_FEATURED';

export default {
    async [FETCH_MASTERCLASS_CATALOG_DATA]({ dispatch }, payload) {
        return Promise.all([dispatch(FETCH_MASTERCLASS_ITEMS, payload)]);
    },

    async [FETCH_MASTERCLASS_ITEMS]({ commit }, { page = DEFAULT_PAGE, sortDirection, sortField, showMore }) {
        try {
            const data = await getCatalogMasterclasses(page, sortDirection, sortField);
            commit(SET_QUERY_PARAMS, { page });
            if (showMore) commit(SET_ITEMS_MORE, data);
            else commit(SET_ITEMS, data);
        } catch (error) {
            storeErrorHandler(FETCH_MASTERCLASS_ITEMS, true)(error);
        }
    },

    async [FETCH_MASTERCLASS]({ commit }, payload) {
        try {
            const data = await getMasterclass(payload);
            commit(SET_MASTERCLASS, data);
        } catch (error) {
            storeErrorHandler(FETCH_MASTERCLASS, true)(error);
        }
    },

    async [FETCH_FEATURED]({ commit }, payload) {
        try {
            const data = await getMasterclasses(payload);
            commit(SET_FEATURED, data);
        } catch (error) {
            storeErrorHandler(FETCH_FEATURED)(error);
        }
    },

    async [FETCH_INSTAGRAM_ITEMS]({ commit }, payload) {
        try {
            const data = await getInstagram(payload);
            commit(SET_INSTAGRAM_ITEMS, data.slice(0, 4));
        } catch (error) {
            storeErrorHandler(FETCH_INSTAGRAM_ITEMS)(error);
        }
    },

    async [FETCH_MASTERCLASS_DATA]({ dispatch, commit }, payload) {
        return Promise.all([
            dispatch(FETCH_MASTERCLASS, payload),
            dispatch(FETCH_INSTAGRAM_ITEMS, payload),
            dispatch(FETCH_FEATURED, payload),
        ]);
    },
};
