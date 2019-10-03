import { getProducts } from '../../../api';
import { $logger } from '../../../services/ServiceLocator';
import { SET_BESTSELLER_PRODUCTS, SET_NEW_PRODUCTS, SET_FEATURED_PRODUCTS } from './mutations';

export const FETCH_LANDING_DATA = 'FETCH_LANDING_DATA';
export const FETCH_NEW_PRODUCTS = 'FETCH_NEW_PRODUCTS';
export const FETCH_BESTSELLER_PRODUCTS = 'FETCH_BESTSELLER_PRODUCTS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';

export default {
    FETCH_FEATURED_PRODUCTS({ commit }) {
        return getProducts()
            .then(data => commit(SET_FEATURED_PRODUCTS, data))
            .catch(error => {
                $logger.error(`FETCH_FEATURED_PRODUCTS error: ${error}`);
                return [];
            });
    },

    FETCH_NEW_PRODUCTS({ commit }) {
        return getProducts()
            .then(data => commit(SET_NEW_PRODUCTS, data))
            .catch(error => {
                $logger.error(`FETCH_NEW_PRODUCTS error: ${error}`);
                return [];
            });
    },

    FETCH_BESTSELLER_PRODUCTS({ commit }) {
        return getProducts()
            .then(data => commit(SET_BESTSELLER_PRODUCTS, data))
            .catch(error => {
                $logger.error(`FETCH_BESTSELLER_PRODUCTS error: ${error}`);
                return [];
            });
    },

    FETCH_LANDING_DATA({ dispatch }) {
        return Promise.all([
            dispatch(FETCH_NEW_PRODUCTS),
            dispatch(FETCH_BESTSELLER_PRODUCTS),
            dispatch(FETCH_FEATURED_PRODUCTS),
        ]);
    },
};
