import { storeErrorHandler } from '@util/store';
import { getPromocodeData } from '@api';

import { SET_PROMOCODES_DATA } from './mutations';

export const FETCH_PROMOCODES_DATA = 'FETCH_PROMOCODES_DATA';
export const SET_LOAD = 'SET_LOAD';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    async [FETCH_PROMOCODES_DATA]({ commit }, isArchive) {
        try {
            const data = await getPromocodeData(isArchive);
            commit(SET_PROMOCODES_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_PROMOCODES_DATA, true)(error);
        }
    },
};
