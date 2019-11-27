import { $logger } from '../../../services/ServiceLocator';
import { getCatalogItems, getCategories, getBanners } from '../../../api';
import { SET_ITEMS, SET_CATEGORIES, SET_BANNER, SET_LOAD as M_SET_LOAD, SET_CATEGORY_CODE } from './mutations';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_BANNER = 'FETCH_BANNER';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATALOG_DATA = 'FETCH_CATALOG_DATA';

export const SET_LOAD = 'SET_LOAD';

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

    [FETCH_ITEMS]({ commit, state }, payload) {
        return getCatalogItems(payload)
            .then(data => {
                if (payload.showMore) commit(SET_ITEMS, { items: state.items.concat(data.items), range: data.range });
                else commit(SET_ITEMS, data);
                commit(SET_CATEGORY_CODE, payload.filter && payload.filter.category);
            })
            .catch(error => {
                $logger.error(`FETCH_ITEMS error: ${error}`);
                return [];
            });
    },

    [SET_LOAD]({ commit }, payload = false) {
        commit(M_SET_LOAD, payload);
    },

    async [FETCH_CATALOG_DATA]({ dispatch, commit }, payload) {
        await Promise.all([dispatch(FETCH_CATEGORIES), dispatch(FETCH_BANNER)]);
        return dispatch(FETCH_ITEMS, payload).then(() => commit(M_SET_LOAD, true));
    },
};
