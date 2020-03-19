import { $logger, $cookie } from '@services';
import { getProducts, getCartData, deleteCartItem, addCartItem, deleteCartData } from '@api';
import { getRandomIntInclusive } from '@util';
import { storeErrorHandler } from '@util/store';

import { SET_CART_DATA, SET_FEATURED_PRODUCTS, SET_RELATIVE_PRODUCTS } from './mutations';

export const CLEAR_CART_DATA = 'CLEAR_CART_DATA';
export const FETCH_CART_DATA = 'FETCH_CART_DATA';
export const FETCH_RELATIVE_PRODUCTS = 'FETCH_RELATIVE_PRODUCTS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';

export default {
    async [FETCH_FEATURED_PRODUCTS]({ commit }, payload = {}) {
        try {
            const data = await getProducts(payload);
            commit(SET_FEATURED_PRODUCTS, data.items.slice(2, 11));
        } catch (error) {
            storeErrorHandler(FETCH_FEATURED_PRODUCTS, error);
        }
    },

    async [FETCH_RELATIVE_PRODUCTS]({ commit }, payload = {}) {
        try {
            commit(SET_RELATIVE_PRODUCTS, []);
            const data = await getProducts(payload);
            const start = getRandomIntInclusive(0, 9);
            const offset = start + getRandomIntInclusive(1, 3);
            commit(SET_RELATIVE_PRODUCTS, data.items.slice(start, offset));
        } catch (error) {
            storeErrorHandler(FETCH_RELATIVE_PRODUCTS, error);
        }
    },

    async [CLEAR_CART_DATA]({ commit }) {
        try {
            await deleteCartData();
            commit(SET_CART_DATA, {});
        } catch (error) {
            storeErrorHandler(FETCH_CART_DATA, error);
        }
    },

    async [FETCH_CART_DATA]({ commit }) {
        try {
            const data = await getCartData();
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_CART_DATA, error);
        }
    },

    async [ADD_CART_ITEM]({ commit }, { offerId, storeId, count } = {}) {
        try {
            const referrerCode = $cookie.get('referal');
            const data = await addCartItem(offerId, storeId, count, referrerCode);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(ADD_CART_ITEM, error);
        }
    },

    async [DELETE_CART_ITEM]({ commit }, { offerId, storeId } = {}) {
        try {
            const data = await deleteCartItem(offerId, storeId);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(DELETE_CART_ITEM, error);
        }
    },
};
