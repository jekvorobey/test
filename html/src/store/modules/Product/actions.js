import { storeErrorHandler } from '@util/store';
import {
    getProduct,
    getBanners,
    getProducts,
    getInstagram,
    getMasterclasses,
    getProductOptions,
    getProductPickupPoints,
    getProductBundles,
    getReviews,
    addReview,
} from '@api';
import {
    SET_PRODUCT,
    SET_BANNERS,
    SET_FEATURED_PRODUCTS,
    SET_INSTAGRAM_ITEMS,
    SET_MASTERCLASSES,
    SET_PRODUCT_OPTIONS,
    SET_REFERRER_CODE,
    SET_PICKUP_POINTS,
    SET_PRODUCT_BUNDLES,
    SET_REVIEWS_DATA,
    ADD_REVIEWS_DATA,
    SET_REVIEWS_PAGE
} from './mutations';

export const FETCH_PRODUCT_DATA = 'FETCH_PRODUCT_DATA';
export const FETCH_INSTAGRAM_ITEMS = 'FETCH_INSTAGRAM_ITEMS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_PRODUCT_OPTIONS = 'FETCH_PRODUCT_OPTIONS';
export const FETCH_PRODUCT_PICKUP_POINTS = 'FETCH_PRODUCT_PICKUP_POINTS';

export const FETCH_BANNERS = 'FETCH_BANNERS';
export const FETCH_MASTERCLASSES = 'FETCH_MASTERCLASSES';

export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';
export const SET_SELECTED_PICKUP_POINT_TYPE = 'SET_SELECTED_PICKUP_POINT_TYPE';

export const FETCH_PRODUCT_BUNDLES = 'FETCH_PRODUCT_BUNDLES';

export const FETCH_REVIEWS_DATA = 'FETCH_REVIEWS_DATA';
export const ADD_REVIEW = 'ADD_REVIEW';
export const SHOW_MORE_REVIEWS = 'SHOW_MORE_REVIEWS';

export default {
    [SET_SELECTED_PICKUP_POINT_TYPE]({ commit }, payload) {
        commit(SET_SELECTED_PICKUP_POINT_TYPE, payload);
    },

    [SET_SELECTED_PICKUP_POINT]({ commit }, payload) {
        commit(SET_SELECTED_PICKUP_POINT, payload);
    },

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

    async [FETCH_PRODUCT_PICKUP_POINTS]({ dispatch, commit }, { code }) {
        try {
            const data = await getProductPickupPoints(code);
            commit(SET_PICKUP_POINTS, data);
        } catch (error) {
            storeErrorHandler(FETCH_PRODUCT_PICKUP_POINTS)(error);
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

    async [FETCH_PRODUCT]({ state, dispatch, commit }, { code, referrerCode }) {
        try {
            const data = await getProduct(code, referrerCode);
            const isSameGroup = state.product.variantGroup === data.variantGroup;
            const { bundles } = await getProductBundles(code);

            commit(SET_PRODUCT, data);
            commit(SET_REFERRER_CODE, referrerCode);
            commit(SET_PRODUCT_BUNDLES, bundles);

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
            dispatch(FETCH_PRODUCT_BUNDLES, payload),
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

    async [FETCH_REVIEWS_DATA]({ commit }, { productCode, sortField, sortDirection, page, perPage }) {
        try {
            const data = await getReviews(productCode, sortField, sortDirection, page, perPage);
            commit(SET_REVIEWS_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_REVIEWS_DATA)(error);
        }
    },

    async [SHOW_MORE_REVIEWS]({ state, commit }, { productCode, sortField, sortDirection, perPage = 5, page }) {
        try {
            const { reviews } = await getReviews(productCode, sortField, sortDirection, page, perPage);
            commit(ADD_REVIEWS_DATA, reviews);
            commit(SET_REVIEWS_PAGE, page);
        } catch(error) {
            storeErrorHandler(SHOW_MORE_REVIEWS, true)(error);
        }
    },

    async [ADD_REVIEW]({ dispatch }, { productCode, formData }) {
        try {
            await addReview(formData);
            dispatch(FETCH_REVIEWS_DATA, { productCode });
        } catch (error) {
            storeErrorHandler(ADD_REVIEW)(error);
        }
    },
};
