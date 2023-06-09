import { storeErrorHandler } from '@util/store';
import {
    getProduct,
    getBanners,
    getProducts,
    getProductOptions,
    getProductPickupPoints,
    getProductMasterclasses,
    getProductBundles,
    addRecentlyViewedProducts,
} from '@api';

import {
    SET_PRODUCT,
    SET_BANNERS,
    SET_FEATURED_PRODUCTS,
    SET_PRODUCT_OPTIONS,
    SET_REFERRER_CODE,
    SET_PICKUP_POINTS,
    SET_PRODUCT_BUNDLES,
    SET_MASTERCLASSES,
} from './mutations';

export const FETCH_PRODUCT_DATA = 'FETCH_PRODUCT_DATA';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCT_OPTIONS = 'FETCH_PRODUCT_OPTIONS';
export const FETCH_PRODUCT_PICKUP_POINTS = 'FETCH_PRODUCT_PICKUP_POINTS';
export const FETCH_PRODUCT_MASTERCLASSES = 'FETCH_PRODUCT_MASTERCLASSES ';

export const FETCH_BANNERS = 'FETCH_BANNERS';

export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';
export const SET_SELECTED_PICKUP_POINT_TYPE = 'SET_SELECTED_PICKUP_POINT_TYPE';

export const FETCH_PRODUCT_BUNDLES = 'FETCH_PRODUCT_BUNDLES';

export default {
    [SET_SELECTED_PICKUP_POINT_TYPE]({ commit }, payload) {
        commit(SET_SELECTED_PICKUP_POINT_TYPE, payload);
    },

    [SET_SELECTED_PICKUP_POINT]({ commit }, payload) {
        commit(SET_SELECTED_PICKUP_POINT, payload);
    },

    async [FETCH_FEATURED_PRODUCTS]({ commit }, payload) {
        try {
            const data = await getProducts(payload);
            commit(SET_FEATURED_PRODUCTS, data);
        } catch (error) {
            storeErrorHandler(FETCH_FEATURED_PRODUCTS)(error);
        }
    },

    async [FETCH_BANNERS]({ commit }, payload) {
        try {
            const data = await getBanners(payload);
            commit(SET_BANNERS, data.slice(3, 6));
        } catch (error) {
            storeErrorHandler(FETCH_BANNERS)(error);
        }
    },

    async [FETCH_PRODUCT_PICKUP_POINTS]({ commit }, { code }) {
        try {
            const data = await getProductPickupPoints(code);
            commit(SET_PICKUP_POINTS, data);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT_PICKUP_POINTS)(error);
        }
    },

    async [FETCH_PRODUCT_MASTERCLASSES]({ commit }, code) {
        try {
            commit(SET_MASTERCLASSES, null);
            const data = await getProductMasterclasses(code);
            commit(SET_MASTERCLASSES, data);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT_MASTERCLASSES)(error);
        }
    },

    async [FETCH_PRODUCT_OPTIONS]({ commit }, payload) {
        try {
            const data = await getProductOptions(payload);
            commit(SET_PRODUCT_OPTIONS, data);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT_OPTIONS)(error);
        }
    },

    async [FETCH_PRODUCT]({ state, dispatch, commit }, { code, referrerCode, offer_id=undefined }) {
        try {
            const data = await getProduct(code, offer_id, referrerCode);
            const isSameGroup = state.product.variantGroup === data.variantGroup;
            const { bundles } = await getProductBundles(code);

            commit(SET_PRODUCT, data);
            commit(SET_REFERRER_CODE, referrerCode);
            commit(SET_PRODUCT_BUNDLES, bundles);

            if (data.productId) await addRecentlyViewedProducts(data.productId);
            if (!isSameGroup)
                if (data.variantGroup) await dispatch(FETCH_PRODUCT_OPTIONS, data.variantGroup);
                else commit(SET_PRODUCT_OPTIONS, null);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT, true)(error);
        }
    },

    async [FETCH_PRODUCT_DATA]({ dispatch }, payload) {
        return Promise.all([
            dispatch(FETCH_PRODUCT, payload),
            dispatch(FETCH_FEATURED_PRODUCTS, payload),
            dispatch(FETCH_PRODUCT_BUNDLES, payload),
            // dispatch(FETCH_BANNERS, payload),
        ]);
    },

    async [FETCH_PRODUCT_BUNDLES]({ commit }, { code }) {
        try {
            const { bundles } = await getProductBundles(code);
            commit(SET_PRODUCT_BUNDLES, bundles);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT_BUNDLES)(error);
        }
    },
};
