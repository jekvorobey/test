import { storeErrorHandler } from '@util/store';
import { getProduct, getBanners, getProducts, getInstagram, getMasterclasses, getProductOptions } from '@api';
import {
    SET_PRODUCT,
    SET_BANNERS,
    SET_FEATURED_PRODUCTS,
    SET_INSTAGRAM_ITEMS,
    SET_MASTERCLASSES,
    SET_PRODUCT_OPTIONS,
} from './mutations';

export const FETCH_PRODUCT_DATA = 'FETCH_PRODUCT_DATA';
export const FETCH_INSTAGRAM_ITEMS = 'FETCH_INSTAGRAM_ITEMS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCT_OPTIONS = 'FETCH_PRODUCT_OPTIONS';
export const FETCH_BANNERS = 'FETCH_BANNERS';
export const FETCH_MASTERCLASSES = 'FETCH_MASTERCLASSES';

export default {
    async [FETCH_MASTERCLASSES]({ commit }, payload) {
        try {
            const data = await getMasterclasses(payload);
            commit(SET_MASTERCLASSES, data);
        } catch (error) {
            storeErrorHandler(FETCH_MASTERCLASSES)(error);
        }
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

    async [FETCH_INSTAGRAM_ITEMS]({ commit }, payload) {
        try {
            const data = await getInstagram(payload);
            commit(SET_INSTAGRAM_ITEMS, data.slice(0, 4));
        } catch (error) {
            storeErrorHandler(FETCH_INSTAGRAM_ITEMS)(error);
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

    async [FETCH_PRODUCT]({ state, dispatch, commit }, payload) {
        try {
            const data = await getProduct(payload);
            const isSameGroup = state.product.variantGroup === data.variantGroup;
            commit(SET_PRODUCT, data);
            if (!isSameGroup)
                if (data.variantGroup) await dispatch(FETCH_PRODUCT_OPTIONS, data.variantGroup);
                else commit(SET_PRODUCT_OPTIONS, null);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT, true)(error);
        }
    },

    async [FETCH_PRODUCT_DATA]({ dispatch }, payload) {
        return await Promise.all([
            dispatch(FETCH_PRODUCT, payload),
            dispatch(FETCH_BANNERS, payload),
            dispatch(FETCH_FEATURED_PRODUCTS, payload),
            dispatch(FETCH_INSTAGRAM_ITEMS, payload),
            dispatch(FETCH_MASTERCLASSES, payload),
        ]);
    },
};
