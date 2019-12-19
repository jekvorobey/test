import { $logger } from '../../../services/ServiceLocator';
import { getProduct, getBanners, getProducts, getInstagram, getMasterclasses } from '../../../api';
import { SET_PRODUCT, SET_BANNERS, SET_FEATURED_PRODUCTS, SET_INSTAGRAM_ITEMS, SET_MASTERCLASSES } from './mutations';

export const FETCH_PRODUCT_DATA = 'FETCH_PRODUCT_DATA';
export const FETCH_INSTAGRAM_ITEMS = 'FETCH_INSTAGRAM_ITEMS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_BANNERS = 'FETCH_BANNERS';
export const FETCH_MASTERCLASSES = 'FETCH_MASTERCLASSES';

export default {
    [FETCH_MASTERCLASSES]({ commit }, payload) {
        return getMasterclasses(payload)
            .then(data => commit(SET_MASTERCLASSES, data))
            .catch(error => {
                $logger.error(`${FETCH_MASTERCLASSES} ${error}`);
                return [];
            });
    },

    [FETCH_PRODUCT]({ commit }, payload) {
        return getProduct(payload)
            .then(data => commit(SET_PRODUCT, data))
            .catch(error => {
                $logger.error(`${FETCH_PRODUCT} ${error}`);
                return {};
            });
    },

    [FETCH_FEATURED_PRODUCTS]({ commit }, payload) {
        return getProducts(payload)
            .then(data => commit(SET_FEATURED_PRODUCTS, data))
            .catch(error => {
                $logger.error(`${FETCH_FEATURED_PRODUCTS} ${error}`);
                return {};
            });
    },

    [FETCH_BANNERS]({ commit }, payload) {
        return getBanners(payload)
            .then(data => commit(SET_BANNERS, data.slice(3, 6)))
            .catch(error => {
                $logger.error(`${FETCH_BANNERS} ${error}`);
                return [];
            });
    },

    [FETCH_INSTAGRAM_ITEMS]({ commit }, payload) {
        return getInstagram(payload)
            .then(data => commit(SET_INSTAGRAM_ITEMS, data.slice(0, 4)))
            .catch(error => {
                $logger.error(`${FETCH_INSTAGRAM_ITEMS} ${error}`);
                return [];
            });
    },

    [FETCH_PRODUCT_DATA]({ dispatch }, payload) {
        return Promise.all([
            dispatch(FETCH_PRODUCT, payload),
            dispatch(FETCH_BANNERS, payload),
            dispatch(FETCH_FEATURED_PRODUCTS, payload),
            dispatch(FETCH_INSTAGRAM_ITEMS, payload),
            dispatch(FETCH_MASTERCLASSES, payload),
        ]);
    },
};
