import { $logger } from '@services';
import { storeErrorHandler } from '@util/store';

import {
    getFavoritesData,
    addFavoritesItem,
    deleteFavoritesItem,
    deleteAllFavorites
} from '@api';

import { SET_FAVORITES_DATA } from './mutations';

export const FETCH_FAVORITES_DATA = 'FETCH_FAVORITES_DATA';
export const SET_LOAD_FAVORITES_PATH = 'SET_LOAD_FAVORITES_PATH';

export default {

    [SET_LOAD_FAVORITES_PATH]({ commit }, payload) {
        commit(SET_LOAD_FAVORITES_PATH, payload);
    },

    async [FETCH_FAVORITES_DATA]({ commit }, { page, orderField, orderDirection }) {
        try {
            const data = await getFavoritesData(page, orderField, orderDirection);
            commit(SET_FAVORITES_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_FAVORITES_DATA, error);
        }
    },
};
