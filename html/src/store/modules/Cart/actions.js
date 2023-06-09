import { cookieNames, requestStatus, httpCodes } from '@enums';
import { $cookie, $retailRocket } from '@services';
import { getRandomIntInclusive } from '@util';
import { storeErrorHandler } from '@util/store';
import { seoEvents, ProductsBuilder } from '@services/SeoEventsService';

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
    checkDiplomaCode,
} from '@api';

import { SET_CART_DATA, SET_FEATURED_PRODUCTS, SET_RELATIVE_PRODUCTS, SET_STATUS, SET_LOADING_ADDING_TO_BASKET } from './mutations';
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

export const CHECK_DIPLOMA_CODE = 'CHECK_DIPLOMA_CODE';

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
            let products = null;

            if (state.cartData.product && Array.isArray(state.cartData.product.items)) {
                const params = state.cartData.product.items.map((item) => ({ quantity: item.count, ...item.p }));
                products = new ProductsBuilder().createForCart(params);
            }

            await deleteAllItems(type);
            const data = { ...state.cartData, [type]: undefined };
            commit(SET_CART_DATA, data);

            if (products !== null) {
                seoEvents.remove(products);
            }
        } catch (error) {
            storeErrorHandler(DELETE_ALL_ITEMS)(error);
        }
    },

    async [ADD_CART_ITEM](
        { state, commit },
        { offerId, storeId, count, referrerCode, cookieName = cookieNames.REFERRAL } = {}
    ) {
        try {
            $retailRocket.addProductToBasket(offerId);
            const code = referrerCode || (cookieName && $cookie.get(cookieName));
            commit(SET_LOADING_ADDING_TO_BASKET, true);
            const data = await addCartItem(offerId, storeId, count, code);

            let addedItem;
            if (state.cartData && state.cartData.product && state.cartData.product.items.length) {
                addedItem = state.cartData.product.items.find((item) => item.p.id === offerId);
            }

            if (addedItem) {
                const difference = count - addedItem.count;
                const params = [{ quantity: Math.abs(difference), ...addedItem.p }];
                const products = new ProductsBuilder().createForCart(params);
                difference > 0 ? seoEvents.add(products) : seoEvents.remove(products);
            } else {
                const item = data.product.items.find((item) => item.p.id === offerId);
                const params = [{ quantity: item.count, ...item.p }];
                const products = new ProductsBuilder().createForCart(params);
                seoEvents.add(products);
            }

            commit(SET_CART_DATA, data);
            commit(SET_LOADING_ADDING_TO_BASKET, false);
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

    async [DELETE_CART_ITEM]({ state, commit }, { offerId, storeId } = {}) {
        try {
            const allItems = state.cartData.product.items.map((item) => ({ quantity: item.count, ...item.p }));
            const params = allItems.filter((item) => item.id === offerId);
            const products = new ProductsBuilder().createForCart(params);

            const data = await deleteCartItem(offerId, storeId);
            commit(SET_CART_DATA, data);

            seoEvents.remove(products);
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

    async [CHECK_CART_DATA]({ commit }, type) {
        try {
            await checkCartData(type);
        } catch (error) {
            const { data, status } = error;
            if (status === httpCodes.BAD_REQUEST) commit(SET_CART_DATA, data);
            storeErrorHandler(CHECK_CART_DATA, true)(error);
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

    async [CHECK_DIPLOMA_CODE]({ commit }, payload) {
        try {
            const data = await checkDiplomaCode(payload);
            commit(SET_CART_DATA, data);
        } catch (error) {
            storeErrorHandler(CHECK_DIPLOMA_CODE)(error);

            return {message: "Код диплома не прошел проверку"}
        }
    },
};
