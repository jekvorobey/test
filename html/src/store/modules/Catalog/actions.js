import { $logger } from '../../../services/ServiceLocator';
import { getProducts, getCategories } from '../../../api';
import { SET_ITEMS, SET_CATEGORIES, SET_PARAMS } from './mutations';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATALOG_DATA = 'FETCH_CATALOG_DATA';

export default {
    [FETCH_CATEGORIES]({ commit }) {
        return getCategories()
            .then(data => commit(SET_CATEGORIES, data))
            .catch(error => {
                $logger.error(`FETCH_CATEGORIES error: ${error}`);
                return [];
            });
    },

    [FETCH_ITEMS]({ commit }, payload) {
        return getProducts(payload)
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
        await Promise.all([dispatch(FETCH_CATEGORIES)]);
        return dispatch(FETCH_ITEMS, payload);
    },
};
