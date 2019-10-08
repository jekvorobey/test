import { $logger } from '../../../services/ServiceLocator';
import { getProducts } from '../../../api';
import { SET_ITEMS, SET_LOAD } from './mutations';

export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_CATALOG_DATA = 'FETCH_CATALOG_DATA';

export default {
    FETCH_ITEMS({ commit }) {
        return getProducts()
            .then(data => commit(SET_ITEMS, data))
            .catch(error => {
                $logger.error(`FETCH_ITEMS error: ${error}`);
                return [];
            });
    },

    FETCH_CATALOG_DATA({ dispatch, commit }) {
        return Promise.all([dispatch(FETCH_ITEMS)]).then(() => commit(SET_LOAD, true));
    },
};
