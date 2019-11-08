import { $logger } from '../../../services/ServiceLocator';
import { getProducts } from '../../../api';
import { SET_CART_ITEMS, SET_FEATURED_PRODUCTS } from './mutations';

export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';

export default {
    [FETCH_FEATURED_PRODUCTS]({ commit }, payload) {
        return getProducts(payload)
            .then(data => commit(SET_FEATURED_PRODUCTS, data.items.slice(2, 11)))
            .catch(error => {
                $logger.error(`${FETCH_FEATURED_PRODUCTS} error: ${error}`);
                return [];
            });
    },

    [FETCH_CART_ITEMS]({ commit }, payload) {
        return getProducts(payload)
            .then(data => commit(SET_CART_ITEMS, data.items.slice(0, 6)))
            .catch(error => {
                $logger.error(`${FETCH_CART_ITEMS} error: ${error}`);
                return [];
            });
    },
};
