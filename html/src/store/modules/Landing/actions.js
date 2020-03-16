import { $logger } from '@services';
import { getProducts, getCategories, getBanners, getBrands, getInstagram, getBannersByCode } from '@api';
import {
    SET_BESTSELLER_PRODUCTS,
    SET_NEW_PRODUCTS,
    SET_FEATURED_PRODUCTS,
    SET_CATEGORIES,
    SET_BANNERS,
    SET_BRANDS,
    SET_INSTAGRAM,
    SET_LOAD,
} from './mutations';

export const FETCH_LANDING_DATA = 'FETCH_LANDING_DATA';
export const FETCH_NEW_PRODUCTS = 'FETCH_NEW_PRODUCTS';
export const FETCH_BESTSELLER_PRODUCTS = 'FETCH_BESTSELLER_PRODUCTS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_BANNERS = 'FETCH_BANNERS';
export const FETCH_BRANDS = 'FETCH_BRANDS';
export const FETCH_INSTAGRAM = 'FETCH_INSTAGRAM';

export default {
    [FETCH_INSTAGRAM]({ commit }) {
        return getInstagram()
            .then(data => commit(SET_INSTAGRAM, data))
            .catch(error => {
                $logger.error(`FETCH_INSTAGRAM error: ${error}`);
                return [];
            });
    },

    [FETCH_BRANDS]({ commit }) {
        return getBrands()
            .then(data => commit(SET_BRANDS, data))
            .catch(error => {
                $logger.error(`FETCH_BRANDS error: ${error}`);
                return [];
            });
    },

    [FETCH_BANNERS]({ commit }) {
        return getBanners()
            .then(data => commit(SET_BANNERS, data))
            .catch(error => {
                $logger.error(`FETCH_BANNERS error: ${error}`);
                return [];
            });
    },

    [FETCH_CATEGORIES]({ commit }) {
        return getCategories()
            .then(data => commit(SET_CATEGORIES, data))
            .catch(error => {
                $logger.error(`FETCH_CATEGORIES error: ${error}`);
                return [];
            });
    },

    [FETCH_FEATURED_PRODUCTS]({ commit }, payload = {}) {
        return Promise.all([getProducts(payload), getBannersByCode('header', true)])
            .then(data => {
                commit(SET_FEATURED_PRODUCTS, {
                    items: data[0] ? data[0].items.slice(8, 12) : [],
                    banner: data[1],
                });
            })
            .catch(error => {
                $logger.error(`FETCH_FEATURED_PRODUCTS error: ${error}`);
                return [];
            });
    },

    [FETCH_NEW_PRODUCTS]({ commit }, payload = {}) {
        return Promise.all([getProducts(payload), getBannersByCode('header', true)])
            .then(data => {
                commit(SET_NEW_PRODUCTS, {
                    items: data[0] ? data[0].items.slice(0, 4) : [],
                    banner: data[1],
                });
            })
            .catch(error => {
                $logger.error(`FETCH_NEW_PRODUCTS error: ${error}`);
                return [];
            });
    },

    [FETCH_BESTSELLER_PRODUCTS]({ commit }, payload = {}) {
        return Promise.all([getProducts(payload), getBannersByCode('header', true)])
            .then(data => {
                commit(SET_BESTSELLER_PRODUCTS, {
                    items: data[0] ? data[0].items.slice(4, 8) : [],
                    banner: data[1],
                });
            })
            .catch(error => {
                $logger.error(`FETCH_BESTSELLER_PRODUCTS error: ${error}`);
                return [];
            });
    },

    [FETCH_LANDING_DATA]({ dispatch, commit }) {
        return Promise.all([
            dispatch(FETCH_NEW_PRODUCTS),
            dispatch(FETCH_BESTSELLER_PRODUCTS),
            dispatch(FETCH_FEATURED_PRODUCTS),
            dispatch(FETCH_CATEGORIES),
            dispatch(FETCH_BANNERS),
            dispatch(FETCH_BRANDS),
            dispatch(FETCH_INSTAGRAM),
        ]).then(() => commit(SET_LOAD, true));
    },
};
