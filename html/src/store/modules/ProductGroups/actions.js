import { $logger } from '../../../services/ServiceLocator';
import { getProductGroups } from '../../../api';
import { SET_ITEMS, SET_LOAD_PATH as M_SET_LOAD_PATH, SET_TYPE as M_SET_TYPE } from './mutations';

export const SET_TYPE = 'SET_TYPE';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const FETCH_ITEMS = 'FETCH_ITEMS';

export default {
    [FETCH_ITEMS]({ commit, state }, { type, page }) {
        return getProductGroups({ type, page })
            .then(data => {
                // if (payload.showMore) commit(SET_ITEMS_MORE, { items: data.items, range: data.range });
                // else commit(SET_ITEMS, { items: data.items, range: data.range });
                commit(SET_TYPE, type);
                commit(SET_ITEMS, { items: data, range: 0 });
            })
            .catch(error => {
                $logger.error(`${FETCH_ITEMS} ${error}`);
                return [];
            });
    },

    [SET_TYPE]({ commit }, payload) {
        commit(M_SET_TYPE, payload);
    },

    [SET_LOAD_PATH]({ commit }, payload) {
        commit(M_SET_LOAD_PATH, payload);
    },
};
