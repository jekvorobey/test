import { $logger } from '@services';
import { storeErrorHandler } from '@util/store';

import {
    getFavorites,
    getFavoritesAll,
    addFavoritesItem,
    deleteFavoritesItem,
    deleteAllFavorites,
} from '@api';

import { SET_FAVORITES, SET_QUERY_PARAMS, SET_FAVORITES_ALL, ADD_TO_FAVORITES_ALL } from './mutations';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const FETCH_FAVORITES_ALL = 'FETCH_FAVORITES_ALL';
export const ADD_FAVORITES_ITEM = 'ADD_FAVORITES_ITEM';

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

    async [FETCH_FAVORITES_ALL]({ commit }) {
        try {
            const data = await getFavoritesAll();
            commit(SET_FAVORITES_ALL, data);
        } catch(error) {
            storeErrorHandler(FETCH_FAVORITES_ALL, error);
        }
    },

    async [ADD_FAVORITES_ITEM]({ commit }, { productId }) {
        try {
            await addFavoritesItem(Number(productId));
            commit(ADD_TO_FAVORITES_ALL, Number(productId));
        } catch(error) {
            storeErrorHandler(ADD_FAVORITES_ITEM, error);
        }
    }
};
