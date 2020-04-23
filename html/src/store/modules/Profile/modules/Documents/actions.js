import { storeErrorHandler } from '@util/store';
import { getDocuments, getDocumentsFilters } from '@api';

import { SET_DOCUMENTS, SET_FILTERS } from './mutations';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const FETCH_DOCUMENTS_DATA = 'fetchDocumentsData';
export const FETCH_DOCUMENTS = 'fetchDocuments';
export const FETCH_FILTERS = 'fetchFilters';

export default {
    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_DOCUMENTS_DATA]({ commit, dispatch }, { type = null, status = null } = {}) {
        try {
            await Promise.all(dispatch(FETCH_DOCUMENTS, { type, status }), dispatch(FETCH_FILTERS));
        } catch (error) {
            storeErrorHandler(FETCH_DOCUMENTS_DATA, error);
        }
    },

    async [FETCH_DOCUMENTS]({ commit }, { type = null, status = null } = {}) {
        try {
            const { documents } = await getDocuments({ type, status });
            commit(SET_DOCUMENTS, documents);
        } catch (error) {
            storeErrorHandler(FETCH_DOCUMENTS, error);
        }
    },

    async [FETCH_FILTERS]({ commit }) {
        try {
            const data = await getDocumentsFilters();
            commit(SET_FILTERS, data);
        } catch (error) {
            storeErrorHandler(FETCH_FILTERS, error);
        }
    },
};
