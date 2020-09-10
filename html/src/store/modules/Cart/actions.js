import { cookieNames, requestStatus, httpCodes } from '@enums';
import { $cookie, $retailRocket } from '@services';
import { getRandomIntInclusive } from '@util';
import { storeErrorHandler } from '@util/store';

import {
    getProducts,
    getCartData,
    checkCartData,
    deleteCartItem,
    addCartItem,
    addMasterclassItem,
    deleteMasterclassItem,
    deleteAllItems,
    addCartPromocode,
    deleteCartPromocode,
    addCartBundle,
    deleteCartBundle,
} from '@api';

import { SET_CART_DATA, SET_FEATURED_PRODUCTS, SET_RELATIVE_PRODUCTS, SET_STATUS } from './mutations';
import { PROMOCODE_STATUS } from './getters';

export const SET_LOAD = 'SET_LOAD';
export const CLEAR_CART_DATA = 'CLEAR_CART_DATA';
export const FETCH_CART_DATA = 'FETCH_CART_DATA';
export const CHECK_CART_DATA = 'CHECK_CART_DATA';

export const FETCH_RELATIVE_PRODUCTS = 'FETCH_RELATIVE_PRODUCTS';
export const FETCH_FEATURED_PRODUCTS = 'FETCH_FEATURED_PRODUCTS';

export const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';

export const ADD_CART_BUNDLE = 'ADD_CART_BUNDLE';
export const DELETE_CART_BUNDLE = 'DELETE_CART_BUNDLE';

export const ADD_PROMOCODE = 'ADD_PROMOCODE';
export const DELETE_PROMOCODE = 'DELETE_PROMOCODE';

export const ADD_MASTERCLASS_ITEM = 'ADD_MASTERCLASS_ITEM';
export const DELETE_MASTERCLASS_ITEM = 'DELETE_MASTERCLASS_ITEM';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    [CLEAR_CART_DATA]({ commit }) {
        commit(SET_CART_DATA, {});
    },

    async [FETCH_FEATURED_PRODUCTS]({ commit }, payload = {}) {
        try {
            const data = await getProducts(payload);
            commit(SET_FEATURED_PRODUCTS, data.items.slice(2, 11));
        } catch (error) {
            storeErrorHandler(FETCH_FEATURED_PRODUCTS)(error);
        }
    },

    async [FETCH_RELATIVE_PRODUCTS]({ commit }, payload = {}) {
        try {
            commit(SET_RELATIVE_PRODUCTS, []);
            const data = await getProducts(payload);
            const start = getRandomIntInclusive(0, 9);
            const offset = start + getRandomIntInclusive(1, 3);
            commit(SET_RELATIVE_PRODUCTS, data.items.slice(start, offset));
        } catch (error) {
            storeErrorHandler(FETCH_RELATIVE_PRODUCTS)(error);
        }
    },

    async [DELETE_ALL_ITEMS]({ state, commit }, type) {
        try {
            await deleteAllItems(type);
            const data = { ...state.cartData, [type]: undefined };
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(DELETE_ALL_ITEMS)(error);
        }
    },

    async [ADD_CART_ITEM](
        { commit },
        { offerId, storeId, count, referrerCode, cookieName = cookieNames.REFERRAL } = {}
    ) {
        try {
            $retailRocket.addProductToBasket(offerId);
            const code = referrerCode || (cookieName && $cookie.get(cookieName));
            const data = await addCartItem(offerId, storeId, count, code);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(ADD_CART_ITEM)(error);
        }
    },

    async [ADD_MASTERCLASS_ITEM]({ commit }, { offerId, count } = {}) {
        try {
            const data = await addMasterclassItem(offerId, count);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(ADD_MASTERCLASS_ITEM)(error);
        }
    },

    async [DELETE_MASTERCLASS_ITEM]({ commit }, { offerId } = {}) {
        try {
            const data = await deleteMasterclassItem(offerId);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(DELETE_MASTERCLASS_ITEM)(error);
        }
    },

    async [DELETE_CART_ITEM]({ commit }, { offerId, storeId } = {}) {
        try {
            const data = await deleteCartItem(offerId, storeId);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(DELETE_CART_ITEM)(error);
        }
    },

    async [ADD_CART_BUNDLE]({ commit }, { bundleId, count = 1, referrerCode, cookieName = cookieNames.REFERRAL } = {}) {
        try {
            const code = referrerCode || (cookieName && $cookie.get(cookieName));
            const data = await addCartBundle(bundleId, count, code);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(ADD_CART_BUNDLE)(error);
        }
    },

    async [DELETE_CART_BUNDLE]({ commit }, bundleId) {
        try {
            const data = await deleteCartBundle(bundleId);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(DELETE_CART_BUNDLE)(error);
        }
    },

    async [ADD_PROMOCODE]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.PENDING });
            const data = await addCartPromocode({ promoCode: payload, data: state.cartData });
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.SUCCESS });
            commit(SET_CART_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(ADD_PROMOCODE, true)(error);
        }
    },

    async [DELETE_PROMOCODE]({ commit, state }) {
        try {
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.PENDING });
            const data = await deleteCartPromocode({ data: state.cartData });
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.SUCCESS });
            commit(SET_CART_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(DELETE_PROMOCODE, true)(error);
        }
    },

    async [CHECK_CART_DATA]({ commit }) {
        try {
            await checkCartData();
        } catch (error) {
            const { data, status } = error;
            const { cart, errors, warnings } = data || {};
            storeErrorHandler(CHECK_CART_DATA)(error);

            if (status === httpCodes.BAD_REQUEST) {
                commit(SET_CART_DATA, cart);
                return { errors, warnings };
            }
        }
    },

    async [FETCH_CART_DATA]({ commit }, isServer) {
        try {
            const data = await getCartData();
            commit(SET_LOAD, isServer);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_CART_DATA)(error);
        }
    },
};
