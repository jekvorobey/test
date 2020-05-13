import { storeErrorHandler } from '@util/store';

export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB';

export default {
    [UPDATE_BREADCRUMB]({ commit }, payload) {
        commit(UPDATE_BREADCRUMB, payload);
    },
};
