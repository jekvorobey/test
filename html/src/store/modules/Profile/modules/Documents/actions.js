import { storeErrorHandler } from '@util/store';
import { getDocumentsStatuses, setDocumentStatus, getDocumentsByStatus } from '@api';

import { SET_DOCUMENTS, SET_STATUSES } from './mutations';

export const LOAD_PATH = 'LOAD_PATH';

export const FETCH_DOCUMENTS_DATA = 'fetchDocumentsData';

export default {
    [LOAD_PATH]({ commit }, payload) {
        commit(LOAD_PATH, payload);
    },

    async [FETCH_DOCUMENTS_DATA]({ commit }, statusId) {
        try {
            const data = await getDocumentsByStatus(statusId);
            commit(SET_DOCUMENTS, data);
        } catch (error) {
            storeErrorHandler(FETCH_DOCUMENTS, error);
        }
    },
};
