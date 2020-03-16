import { $logger } from '@services/ServiceLocator';
import { getProducts, getCartData, deleteCartItem, addCartItem } from '@api';
import { SET_CART_DATA, SET_FEATURED_PRODUCTS, SET_RELATIVE_PRODUCTS } from './mutations';
import { getRandomIntInclusive } from '@util/helpers';

export const CLEAR_CART_DATA = 'CLEAR_CART_DATA';
export const FETCH_CART_DATA = 'FETCH_CART_DATA';
export const FETCH_RELATIVE_PRODUCTS = 'FETCH_RELATIVE_PRODUCTS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';

export default {
    [FETCH_FEATURED_PRODUCTS]({ commit }, payload = {}) {
        return getProducts(payload)
            .then(data => commit(SET_FEATURED_PRODUCTS, data.items.slice(2, 11)))
            .catch(error => {
                $logger.error(`${FETCH_FEATURED_PRODUCTS} ${error}`);
                return [];
            });
    },

    [FETCH_RELATIVE_PRODUCTS]({ commit }, payload = {}) {
        commit(SET_RELATIVE_PRODUCTS, []);
        return getProducts(payload)
            .then(data => {
                const start = getRandomIntInclusive(0, 9);
                const offset = start + getRandomIntInclusive(1, 3);
                commit(SET_RELATIVE_PRODUCTS, data.items.slice(start, offset));
            })
            .catch(error => {
                $logger.error(`${FETCH_RELATIVE_PRODUCTS} ${error}`);
                return [];
            });
    },

    [CLEAR_CART_DATA]({ commit }) {
        commit(SET_CART_DATA, {});
    },

    [FETCH_CART_DATA]({ commit }) {
        return getCartData()
            .then(data => commit(SET_CART_DATA, data))
            .catch(error => $logger.error(`${FETCH_CART_DATA} ${error}`));
    },

    [ADD_CART_ITEM]({ commit }, { offerId, storeId, count } = {}) {
        return addCartItem({ offerId, storeId, count })
            .then(data => commit(SET_CART_DATA, data))
            .catch(error => $logger.error(`${ADD_CART_ITEM} ${error}`));
    },

    [DELETE_CART_ITEM]({ commit }, payload = {}) {
        return deleteCartItem(payload)
            .then(data => commit(SET_CART_DATA, data))
            .catch(error => $logger.error(`${DELETE_CART_ITEM} ${error}`));
    },
};
