import { storeErrorHandler } from '@util/store';
import { getPromocodeData } from '@api';

import { SET_PROMOCODES_DATA } from './mutations';

export const FETCH_PROMOCODES_DATA = 'FETCH_PROMOCODES_DATA';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_PROMOCODES_DATA]({ state, commit }, isArchive) {
        try {
            const data = await getPromocodeData(isArchive);
            commit(SET_PROMOCODES_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_PROMOCODES_DATA, true)(error);
        }
    },
};
