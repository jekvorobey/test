import { $logger } from '../../../services/ServiceLocator';
import { getCatalogItems, getCategories, getBanners, getBrand } from '../../../api';
import {
    SET_ITEMS,
    SET_CATEGORIES,
    SET_BANNER,
    SET_BRAND,
    SET_LOAD as M_SET_LOAD,
    SET_CATEGORY_CODE,
} from './mutations';
import { getRandomIntInclusive } from '../../../util/helpers';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_BANNER = 'FETCH_BANNER';
export const FETCH_BRAND = 'FETCH_BRAND';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATALOG_DATA = 'FETCH_CATALOG_DATA';
export const FETCH_BRAND_DATA = 'FETCH_BRAND_DATA';

export const SET_LOAD = 'SET_LOAD';

export default {
    [FETCH_BANNER]({ commit }, payload) {
        return getBanners()
            .then(data => {
                commit(SET_BANNER, data[6]);
            })
            .catch(error => {
                $logger.error(`${FETCH_BANNER} ${error}`);
                return [];
            });
    },

    [FETCH_CATEGORIES]({ commit }, payload) {
        return getCategories()
            .then(data => {
                commit(SET_CATEGORIES, data);
            })
            .catch(error => {
                $logger.error(`${FETCH_CATEGORIES} ${error}`);
                return [];
            });
    },

    [FETCH_ITEMS]({ commit, state }, payload) {
        return getCatalogItems(payload)
            .then(data => {
                if (payload.showMore) commit(SET_ITEMS, { items: state.items.concat(data.items), range: data.range });
                else commit(SET_ITEMS, data);
                commit(SET_CATEGORY_CODE, payload.filter && payload.filter.category);
            })
            .catch(error => {
                $logger.error(`${FETCH_ITEMS} ${error}`);
                return [];
            });
    },

    [SET_LOAD]({ commit }, payload = false) {
        commit(M_SET_LOAD, payload);
    },

    [FETCH_BRAND]({ commit }, payload) {
        return getBrand(payload).then(data => commit(SET_BRAND, data));
    },

    async [FETCH_BRAND_DATA]({ dispatch }, payload) {
        return Promise.all([dispatch(FETCH_CATEGORIES), dispatch(FETCH_BRAND, payload)]);
    },

    async [FETCH_CATALOG_DATA]({ dispatch, commit }, payload = {}) {
        if (payload.brandCode)
            await Promise.all([dispatch(FETCH_CATEGORIES), dispatch(FETCH_BRAND, { brandCode: payload.brandCode })]);
        else await Promise.all([dispatch(FETCH_CATEGORIES), dispatch(FETCH_BANNER)]);
        return dispatch(FETCH_ITEMS, payload).then(() => commit(M_SET_LOAD, true));
    },
};
