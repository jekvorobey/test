import { $logger } from '../../../services/ServiceLocator';
import { getProducts, getCartData, deleteCartItem } from '../../../api';
import { SET_CART_DATA, SET_FEATURED_PRODUCTS } from './mutations';

export const FETCH_CART_DATA = 'FETCH_CART_DATA';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export default {
    [FETCH_FEATURED_PRODUCTS]({ commit }, payload) {
        return getProducts(payload)
            .then(data => commit(SET_FEATURED_PRODUCTS, data.items.slice(2, 11)))
            .catch(error => {
                $logger.error(`${FETCH_FEATURED_PRODUCTS} ${error}`);
                return [];
            });
    },

    [FETCH_CART_DATA]({ commit }, payload) {
        return getCartData(payload)
            .then(data => commit(SET_CART_DATA, data))
            .catch(error => {
                $logger.error(`${FETCH_CART_DATA} ${error}`);
                return [];
            });
    },

    [DELETE_CART_ITEM]({ commit }, payload = {}) {
        return deleteCartItem(payload)
            .then(data => commit(SET_CART_DATA, data))
            .catch(error => $logger.error(`${DELETE_CART_ITEM} ${error}`));
    },
};
