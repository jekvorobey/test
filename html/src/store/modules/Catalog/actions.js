import { $logger } from '../../../services/ServiceLocator';
import { getCatalogItems, getCategories, getBanners } from '../../../api';
import { SET_ITEMS, SET_CATEGORIES, SET_PARAMS, SET_BANNER } from './mutations';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_BANNER = 'FETCH_BANNER';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATALOG_DATA = 'FETCH_CATALOG_DATA';

export default {
    [FETCH_BANNER]({ commit }) {
        return getBanners()
            .then(data => commit(SET_BANNER, data[6]))
            .catch(error => {
                $logger.error(`FETCH_BANNER error: ${error}`);
                return [];
            });
    },

    [FETCH_CATEGORIES]({ commit }) {
        return getCategories()
            .then(data => commit(SET_CATEGORIES, data))
            .catch(error => {
                $logger.error(`FETCH_CATEGORIES error: ${error}`);
                return [];
            });
    },

    [FETCH_ITEMS]({ commit }, payload) {
        return getCatalogItems(payload)
            .then(data => {
                commit(SET_ITEMS, data);
                commit(SET_PARAMS, payload);
            })
            .catch(error => {
                $logger.error(`FETCH_ITEMS error: ${error}`);
                return [];
            });
    },

    async [FETCH_CATALOG_DATA]({ dispatch }, payload) {
        await Promise.all([dispatch(FETCH_CATEGORIES), dispatch(FETCH_BANNER)]);
        return dispatch(FETCH_ITEMS, payload);
    },
};
