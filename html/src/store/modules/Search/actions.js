import _debounce from 'lodash/debounce';
import { $logger } from '@services';
import { search, getProducts, getSearchPopularRequest } from '@api';
import { storeErrorHandler } from '@util/store';
import {
    SET_SEARCH as M_SET_SEARCH,
    SET_SEARCH_SUGGESTION,
    SET_POPULAR_PRODUCTS,
    SET_SEARCH_STRING,
    SET_POPULAR_REQUESTS,
} from './mutations';

const debounce_Suggestion = _debounce(async (commit, payload) => {
    const resp = await search(payload);
    commit(SET_SEARCH_SUGGESTION, resp);
}, 500);

export const GET_POPULAR_PRODUCTS = 'GET_POPULAR_PRODUCTS';
export const GET_POPULAR_REQUESTS = 'GET_POPULAR_REQUESTS';
export const SET_SEARCH = 'SET_SEARCH';
export const SEARCH = 'SEARCH';

export default {
    [GET_POPULAR_PRODUCTS]({ commit }, payload = {}) {
        return getProducts(payload)
            .then(data => commit(SET_POPULAR_PRODUCTS, data.items.slice(0, 4)))
            .catch(error => {
                $logger.error(`GET_POPULAR_PRODUCTS error: ${error}`);
                return {};
            });
    },

    async [GET_POPULAR_REQUESTS]({ commit }, limit = 10) {
        try {
            const { search_requests } = await getSearchPopularRequest(limit);
            commit(SET_POPULAR_REQUESTS, search_requests);
        } catch(error) {
            storeErrorHandler(GET_POPULAR_REQUESTS)(error);
        }
    },

    [SET_SEARCH]({ commit }, payload) {
        commit(M_SET_SEARCH, payload);
    },

    [SEARCH]({ commit }, payload) {
        commit(SET_SEARCH_STRING, payload);
        return debounce_Suggestion(commit, payload);
    },
};
