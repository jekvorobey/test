import { $logger } from '../../../services/ServiceLocator';
import { getBrandsCatalog } from '../../../api';
import { SET_ITEMS, SET_LOAD as M_SET_LOAD } from './mutations';

export const SET_LOAD = 'SET_LOAD';
export const FETCH_ITEMS = 'FETCH_ITEMS';
export const FETCH_BRANDS_DATA = 'FETCH_BRANDS_DATA';

export default {
    async [FETCH_ITEMS]({ commit }, payload) {
        try {
            const data = await getBrandsCatalog(payload);
            commit(SET_ITEMS, data);
        } catch (error) {
            $logger.error(`${FETCH_ITEMS}: ${error}`);
            return [];
        }
    },

    [SET_LOAD]({ commit }, payload = false) {
        commit(M_SET_LOAD, payload);
    },

    [FETCH_BRANDS_DATA]({ dispatch }, payload) {
        return dispatch(FETCH_ITEMS, payload)
            .then(() => dispatch(SET_LOAD, true))
            .catch(() => dispatch(SET_LOAD, false));
    },
};
