import { DELETE } from "../../../../node_modules/fast-diff/diff";

export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const SET_FAVORITES = 'SET_FAVORITES';
export const SET_FAVORITES_ALL = 'SET_FAVORITES_ALL';
export const SET_FAVORITES_MORE = 'SET_FAVORITES_MORE';
export const ADD_TO_FAVORITES_ALL = 'ADD_TO_FAVORITES_ALL';
export const DELETE_FAVORITES_ITEM = 'DELETE_FAVORITES_ITEM';
export const DELETE_FAVORITES_ALL = 'DELETE_FAVORITES_ALL';

export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_FAVORITES](state, payload = {}) {
        state.favorites = payload;
    },

    [SET_FAVORITES_MORE](state, { items, range }) {
        state.favorites.push(...items);
        state.range = range || 0;
    },

    [SET_QUERY_PARAMS](state, { page = 1, orderField, orderDirection }) {
        state.activePage = Number(page);
        state.orderField = orderField;
        state.orderDirection = orderDirection;
    },

    [SET_FAVORITES_ALL](state, payload ) {
        state.favoritesAll = payload;
    },

    [ADD_TO_FAVORITES_ALL](state, productId) {
        state.favoritesAll.push(productId);
    },

    [DELETE_FAVORITES_ITEM](state, productId) {
        const id = state.favoritesAll.indexOf(id);
        if (id !== -1) {
            state.favoritesAll.splice(id, 1);
        }
        const productIndex = state.favorites.findIndex(item => item.productId === productId);
        if (product != -1) {
            state.favorites.splice(productIndex, 1);
        }
    },

    [DELETE_FAVORITES_ALL](state) {
        state.favoritesAll = [];
        state.favorites = [];
    },
};
