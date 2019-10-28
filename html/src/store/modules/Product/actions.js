import { $logger } from '../../../services/ServiceLocator';
import { getProduct, getBanners, getProducts, getInstagram } from '../../../api';
import { SET_PRODUCT, SET_BANNERS, SET_FEATURED_PRODUCTS, SET_INSTAGRAM_ITEMS } from './mutations';

export const FETCH_PRODUCT_DATA = 'FETCH_PRODUCT_DATA';
export const FETCH_INSTAGRAM_ITEMS = 'FETCH_INSTAGRAM_ITEMS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_BANNERS = 'FETCH_BANNERS';

export default {
    [FETCH_PRODUCT]({ commit }, payload) {
        return getProduct(payload)
            .then(data => commit(SET_PRODUCT, data))
            .catch(error => {
                $logger.error(`FETCH_PRODUCT error: ${error}`);
                return {};
            });
    },

    [FETCH_FEATURED_PRODUCTS]({ commit }, payload) {
        return getProducts(payload)
            .then(data => commit(SET_FEATURED_PRODUCTS, data))
            .catch(error => {
                $logger.error(`SET_FEATURED_PRODUCTS error: ${error}`);
                return {};
            });
    },

    [FETCH_BANNERS]({ commit }, payload) {
        return getBanners(payload)
            .then(data => commit(SET_BANNERS, data.slice(3, 6)))
            .catch(error => {
                $logger.error(`SET_BANNERS error: ${error}`);
                return [];
            });
    },

    [FETCH_INSTAGRAM_ITEMS]({ commit }, payload) {
        return getInstagram(payload)
            .then(data => commit(SET_INSTAGRAM_ITEMS, data.slice(0, 4)))
            .catch(error => {
                $logger.error(`SET_INSTAGRAM_ITEMS error: ${error}`);
                return [];
            });
    },

    [FETCH_PRODUCT_DATA]({ dispatch }, payload) {
        return Promise.all([
            dispatch(FETCH_PRODUCT, payload),
            dispatch(FETCH_BANNERS, payload),
            dispatch(FETCH_FEATURED_PRODUCTS, payload),
            dispatch(FETCH_INSTAGRAM_ITEMS, payload),
        ]);
    },
};
