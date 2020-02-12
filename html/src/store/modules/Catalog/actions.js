import { $logger } from '../../../services/ServiceLocator';
import { productGroupTypes } from '../../../assets/scripts/enums';
import { storeErrorHandler } from '../../../util/store';
import { getCatalogItems, getCategories, getBanners, getBrand, getFilters, getProductGroup } from '../../../api';
import {
    SET_FILTERS,
    SET_ITEMS,
    SET_ITEMS_MORE,
    SET_CATEGORIES,
    SET_BANNER,
    SET_LOAD_PATH as M_SET_LOAD_PATH,
    SET_CATEGORY_CODE,
    SET_BRAND_CODE,
    SET_PRODUCT_GROUP,
    SET_TYPE,
    SET_ENTITY_CODE,
} from './mutations';

export const FETCH_FILTERS = 'FETCH_FILTERS';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_BANNER = 'FETCH_BANNER';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_PRODUCT_GROUP = 'FETCH_PRODUCT_GROUP';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const FETCH_DATA_BY_TYPE = 'FETCH_DATA_BY_TYPE';
export const FETCH_CATALOG_DATA = 'FETCH_CATALOG_DATA';
export const FETCH_PRODUCT_GROUP_DATA = 'FETCH_PRODUCT_GROUP_DATA';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(M_SET_LOAD_PATH, payload);
    },

    async [FETCH_BANNER]({ commit }, payload) {
        try {
            const data = await getBanners();
            commit(SET_BANNER, data[6]);
        } catch (thrown) {
            storeErrorHandler(FETCH_BANNER, true)(thrown);
        }
    },

    async [FETCH_CATEGORIES]({ commit }, payload) {
        try {
            const data = await getCategories(payload);
            commit(SET_CATEGORIES, data);
        } catch (thrown) {
            storeErrorHandler(FETCH_CATEGORIES, true)(thrown);
        }
    },

    async [FETCH_FILTERS]({ commit }, payload) {
        try {
            const data = await getFilters(payload);
            commit(SET_FILTERS, data);
        } catch (thrown) {
            storeErrorHandler(FETCH_FILTERS, true)(thrown);
        }
    },

    async [FETCH_ITEMS]({ commit, state }, payload) {
        try {
            const { filters } = state.productGroup || {};
            const filter = { ...payload.filter, ...filters };
            const data = await getCatalogItems({ ...payload, filter });
            if (payload.showMore) commit(SET_ITEMS_MORE, data);
            else commit(SET_ITEMS, data);
        } catch (thrown) {
            storeErrorHandler(FETCH_ITEMS, true)(thrown);
        }
    },

    async [FETCH_PRODUCT_GROUP]({ commit }, code) {
        try {
            const data = await getProductGroup(code);
            commit(SET_PRODUCT_GROUP, data);
            return data;
        } catch (thrown) {
            storeErrorHandler(FETCH_PRODUCT_GROUP, true)(thrown);
        }
    },

    async [FETCH_PRODUCT_GROUP_DATA]({ dispatch }, payload = {}) {
        try {
            await dispatch(FETCH_PRODUCT_GROUP, payload.entityCode);
            await Promise.all([dispatch(FETCH_CATEGORIES, payload), dispatch(FETCH_FILTERS, payload.filter.category)]);
            return dispatch(FETCH_ITEMS, payload);
        } catch (thrown) {
            storeErrorHandler(FETCH_PRODUCT_GROUP_DATA)(thrown);
        }
    },

    async [FETCH_CATALOG_DATA]({ dispatch, commit }, payload = {}) {
        try {
            await Promise.all([
                dispatch(FETCH_BANNER, payload),
                dispatch(FETCH_CATEGORIES, payload),
                dispatch(FETCH_FILTERS, payload.filter.category),
            ]);
            commit(SET_PRODUCT_GROUP, null);
            return dispatch(FETCH_ITEMS, payload);
        } catch (thrown) {
            storeErrorHandler(FETCH_CATALOG_DATA)(thrown);
        }
    },

    async [FETCH_DATA_BY_TYPE]({ dispatch, commit }, payload = { type: productGroupTypes.CATALOG }) {
        const { type, entityCode, code, filter } = payload;
        let fetchMethod = null;

        switch (payload.type) {
            case productGroupTypes.CATALOG:
                fetchMethod = FETCH_CATALOG_DATA;
                break;
            case productGroupTypes.BRANDS:
            case productGroupTypes.PROMO:
            case productGroupTypes.SETS:
                fetchMethod = FETCH_PRODUCT_GROUP_DATA;
                break;
            default:
                return Promise.reject(new Error(`Wrong catalog type ${payload.type}`));
        }

        return dispatch(fetchMethod, payload).then(() => {
            commit(SET_TYPE, type);
            commit(SET_CATEGORY_CODE, filter.category);
            commit(SET_ENTITY_CODE, entityCode);
        });
    },
};
