import { $logger } from '@services';
import { storeErrorHandler } from '@util/store';

import {
    getFavorites,
    addFavoritesItem,
    deleteFavoritesItem,
    deleteAllFavorites
} from '@api';

import { SET_FAVORITES, SET_QUERY_PARAMS } from './mutations';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export default {

    [SET_LOAD_PATH]({ commit }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_FAVORITES]({ state, commit }, { page, orderField, orderDirection, showMore = false }) {
        try {
            const { favorites: items, favoritesCount: range } = await getFavorites(
                page,
                orderField,
                orderDirection,
            );

            commit(SET_QUERY_PARAMS, { page, orderField, orderDirection });
            if (showMore) commit(SET_FAVORITES_MORE, { items, range });
            else commit(SET_FAVORITES, { items, range });
        } catch (error) {
            storeErrorHandler(FETCH_FAVORITES, true)(error);
        }
    },

    async [FETCH_FAVORITES]({ commit }, { page, orderField, orderDirection, showMore = false }) {
        try {
            const data = await getFavorites(page, orderField, orderDirection);
            commit(SET_FAVORITES, data);
        } catch (error) {
            storeErrorHandler(FETCH_FAVORITES, error);
        }
    },
};
