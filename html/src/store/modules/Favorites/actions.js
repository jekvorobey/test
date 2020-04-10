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
export const ADD_FAVORITES_ITEM = 'ADD_FAVORITES_ITEM';
export const DELETE_ALL_FAVORITES = 'DELETE_ALL_FAVORITES';
export const DELETE_FAVORITES_ITEM = 'DELETE_FAVORITES_ITEM';
export const CLEAR_FAVORITES_DATA = 'CLEAR_FAVORITES_DATA';


export default {

    async [FETCH_FAVORITES_DATA]({ commit }, { page, orderField, orderDirection }) {
        try {
            const data = await getFavoritesData(page, orderField, orderDirection);
            console.log(data);
            commit(SET_FAVORITES_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_FAVORITES_DATA, error);
        }
    },

    async [ADD_FAVORITES_ITEM]({ commit }, { productId }) {
        try {
            const data = await addFavoritesItem(productId);
            commit(SET_FAVORITES_DATA, data);
        } catch (error) {
            storeErrorHandler(ADD_FAVORITES_ITEM, error);
        }
    },

    async [DELETE_FAVORITES_ITEM]({ commit }, { productId }) {
        try {
            const data = await deleteFavoritesItem(productId);
            commit(SET_FAVORITES_DATA, data);
        } catch (error) {
            storeErrorHandler(DELETE_FAVORITES_ITEM, error);
        }
    },

    async [DELETE_ALL_FAVORITES]({ commit }) {
        try {
            await deleteAllFavorites();
            commit(SET_FAVORITES_DATA, {});
        } catch (error) {
            storeErrorHandler(DELETE_ALL_FAVORITES, error);
        }
    },

    async [CLEAR_FAVORITES_DATA]({ commit }) {
        commit(SET_FAVORITES_DATA, {});
    },
};
