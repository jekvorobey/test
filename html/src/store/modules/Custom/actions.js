import { getCustomPageData } from '@api';
import { storeErrorHandler } from '@util/store';
import { SET_PAGE_DATA } from './mutations';

const FETCH_PAGE_DATA = 'FETCH_PAGE_DATA';
export const FETCH_CUSTOM_PAGE_DATA = 'FETCH_CUSTOM_PAGE_DATA';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_PAGE_DATA]({ commit }, path) {
        try {
            const data = await getCustomPageData(path);
            commit(SET_PAGE_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_PAGE_DATA, true)(error);
        }
    },

    [FETCH_CUSTOM_PAGE_DATA]({ dispatch }, path) {
        return Promise.all([dispatch(FETCH_PAGE_DATA, path)]);
    },
};
