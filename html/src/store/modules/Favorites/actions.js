import {
    $logger
} from '@services';
import {
    storeErrorHandler
} from '@util/store';
import {
    FAVORITES_PAGE_SIZE
} from '@constants/favorites';

import {
    getFavorites,
    getFavoritesAll,
    addFavoritesItem,
    deleteFavoritesItem,
    deleteAllFavorites
} from '@api';
import {
    SET_FAVORITES,
    SET_QUERY_PARAMS,
    SET_FAVORITES_ALL
} from './mutations';
import {
    IS_IN_FAVORITES
} from './getters';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const FETCH_FAVORITES_ALL = 'FETCH_FAVORITES_ALL';
export const TOGGLE_FAVORITES_ITEM = 'TOGGLE_FAVORITES_ITEM';
export const ADD_FAVORITES_ITEM = 'ADD_FAVORITES_ITEM';
export const DELETE_FAVORITES_ITEM = 'DELETE_FAVORITES_ITEM';
export const DELETE_FAVORITES_ALL = 'DELETE_FAVORITES_ALL';

export default {
    [SET_LOAD_PATH]({
        commit
    }, payload) {
        commit(SET_LOAD_PATH, payload);
    },

    async [FETCH_FAVORITES]({
        state,
        commit
    }, {
        page,
        orderField,
        orderDirection,
        showMore = false
    }) {
        try {
            const data = await getFavorites(page, FAVORITES_PAGE_SIZE, orderField, orderDirection);
            commit(SET_QUERY_PARAMS, {
                page,
                orderField,
                orderDirection
            });
            if (showMore) commit(SET_FAVORITES_MORE, data);
            else commit(SET_FAVORITES, data);
        } catch (error) {
            storeErrorHandler(FETCH_FAVORITES, true)(error);
        }
    },

    async [FETCH_FAVORITES_ALL]({
        commit
    }) {
        try {
            const data = await getFavoritesAll();
            commit(SET_FAVORITES_ALL, data);
        } catch (error) {
            storeErrorHandler(FETCH_FAVORITES_ALL, error);
        }
    },

    async [TOGGLE_FAVORITES_ITEM]({
        dispatch,
        getters
    }, productId) {
        const exists = getters[IS_IN_FAVORITES](productId);
        if (exists) await dispatch(DELETE_FAVORITES_ITEM, productId);
        else await dispatch(ADD_FAVORITES_ITEM, productId);
    },

    async [ADD_FAVORITES_ITEM]({
        commit
    }, productId) {
        try {
            await addFavoritesItem(productId);
            commit(ADD_FAVORITES_ITEM, productId);
        } catch (error) {
            storeErrorHandler(ADD_FAVORITES_ITEM, error);
        }
    },

    async [DELETE_FAVORITES_ITEM]({
        commit
    }, productId) {
        try {
            await deleteFavoritesItem(productId);
            commit(DELETE_FAVORITES_ITEM, productId);
        } catch (error) {
            storeErrorHandler(DELETE_FAVORITES_ITEM, error);
        }
    },

    async [DELETE_FAVORITES_ALL]({
        commit
    }) {
        try {
            await deleteAllFavorites();
            commit(DELETE_FAVORITES_ALL);
        } catch (error) {
            storeErrorHandler(DELETE_FAVORITES_ALL, error);
        }
    },
};
