import { $logger } from '../../../services/ServiceLocator';
import {
    getCheckoutAddresses,
    getCheckoutConfirmationTypes,
    getCheckoutReceiveMethods,
    getCheckoutDeliveryTypes,
    getCheckoutPaymentMethods,
    getCheckoutData,
    getCheckoutPackages,
    getCheckoutPickupPoints,
    addBonus,
    deleteBonus,
    addSertificate,
    deleteSertificate,
    addPromocode,
    deletePromocode,
    changeReceiveMethod,
} from '../../../api';

import {
    SET_DATA,
    SET_CONFIRMATION_TYPES,
    SET_DELIVERY_TYPES,
    SET_PAYMENT_METHODS,
    SET_RECEIVE_METHODS,
    SET_ADDRESSES,
    SET_PACKAGES,
    SET_TYPE,
    SET_PICKUP_POINTS,
    SET_DATA_PROP as M_SET_DATA_PROP,
    SET_SELECTED_ADDRESS as M_SET_SELECTED_ADDRESS,
    SET_SELECTED_PICKUP_POINT as M_SET_SELECTED_PICKUP_POINT,
    SET_RECEIVE_METHOD as M_SET_RECEIVE_METHOD,
    SET_SELECTED_PACKAGE as M_SET_SELECTED_PACKAGE,
    SET_PACKAGE_DATE,
    ADD_ADDRESS as M_ADD_ADDRESS,
} from './mutations';

import { receiveTypes } from '../../../assets/scripts/constants';

export const SET_DATA_PROP = 'SET_DATA_PROP';
export const SET_RECEIVE_METHOD = 'SET_RECEIVE_METHOD';
export const SET_SELECTED_PACKAGE = 'SET_SELECTED_PACKAGE';
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';

export const ADD_BONUS = 'ADD_BONUS';
export const DELETE_BONUS = 'DELETE_BONUS';

export const ADD_SERTIFICATE = 'ADD_SERTIFICATE';
export const DELETE_SERTIFICATE = 'DELETE_SERTIFICATE';

export const ADD_PROMOCODE = 'ADD_PROMOCODE';
export const DELETE_PROMOCODE = 'DELETE_PROMOCODE';

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const CHANGE_ADDRESS = 'CHANGE_ADDRESS';

export const FETCH_CHECKOUT_DATA = 'FETCH_CHECKOUT_DATA';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_PAYMENT_METHODS = 'FETCH_PAYMENT_METHODS';
export const FETCH_RECEIVE_METHODS = 'FETCH_RECEIVE_METHODS';
export const FETCH_DELIVERY_TYPES = 'FETCH_DELIVERY_TYPES';
export const FETCH_CONFIRMATION_TYPES = 'FETCH_CONFIRMATION_TYPES';
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const FETCH_PICKUP_POINTS = 'FETCH_PICKUP_POINTS';
export const FETCH_PACKAGES = 'FETCH_PACKAGES';

export const APPLY_RECEIVE_METHOD = 'APPLY_RECEIVE_METHOD';

export const CHANGE_PACKAGE_DATE = 'CHANGE_PACKAGE_DATE';

export default {
    [SET_DATA_PROP]({ commit }, payload) {
        commit(M_SET_DATA_PROP, payload);
    },

    [SET_SELECTED_ADDRESS]({ commit, dispatch, state }, payload) {
        commit(M_SET_SELECTED_ADDRESS, payload);
        commit(M_SET_DATA_PROP, { prop: 'address', value: payload.id ? { id: payload.id } : payload });
        if (payload)
            return dispatch(FETCH_PACKAGES, { id: payload.id, methodID: state.selectedReceiveMethod.methods[0].id });
        return Promise.resolve();
    },

    [SET_SELECTED_PICKUP_POINT]({ commit, dispatch }, payload) {
        commit(M_SET_SELECTED_PICKUP_POINT, payload);
        commit(M_SET_DATA_PROP, { prop: 'pickupPoint', value: payload });
        commit(M_SET_DATA_PROP, { prop: 'deliveryMethodID', value: payload ? payload.methodID : null });
        if (payload) return dispatch(FETCH_PACKAGES, { id: payload.id, methodID: payload.methodID });
        return Promise.resolve();
    },

    [APPLY_RECEIVE_METHOD]({ commit }, payload) {
        return changeReceiveMethod(payload).then(data => {
            commit(SET_DATA, data);
            commit(M_SET_RECEIVE_METHOD, payload.method);
            commit(M_SET_DATA_PROP, { prop: 'receiveMethodID', value: payload.method.id });
        });
    },

    async [SET_RECEIVE_METHOD]({ commit, dispatch, state }, payload) {
        try {
            await dispatch(APPLY_RECEIVE_METHOD, { method: payload, data: state.checkoutData });

            if (payload.id === receiveTypes.DELIVERY || payload.id === receiveTypes.EXPRESS) {
                const defaultMethodID = payload.methods[0].id;
                commit(M_SET_SELECTED_PICKUP_POINT, null);
                commit(M_SET_DATA_PROP, { prop: 'pickupPoint', value: null });
                commit(M_SET_DATA_PROP, { prop: 'deliveryMethodID', value: defaultMethodID });
                return dispatch(SET_SELECTED_ADDRESS, state.selectedAddress || state.addresses[0]);
            }

            commit(M_SET_DATA_PROP, { prop: 'deliveryMethodID', value: null });
            return Promise.resolve();
        } catch (error) {
            $logger.error(`${SET_RECEIVE_METHOD} ${error}`);
            return Promise.reject(error);
        }
    },

    [SET_SELECTED_PACKAGE]({ commit }, payload) {
        commit(M_SET_SELECTED_PACKAGE, payload);
        commit(M_SET_DATA_PROP, { prop: 'deliveryTypeID', value: payload.typeID });
    },

    [ADD_BONUS]({ commit, state }, payload) {
        return addBonus({ bonus: payload, data: state.checkoutData })
            .then(data => commit(SET_DATA, data))
            .catch(error => $logger.error(`${ADD_BONUS} ${error}`));
    },

    [DELETE_BONUS]({ commit, state }, payload) {
        return deleteBonus({ bonus: payload, data: state.checkoutData })
            .then(data => commit(SET_DATA, data))
            .catch(error => $logger.error(`${DELETE_BONUS} ${error}`));
    },

    [ADD_SERTIFICATE]({ commit, state }, payload) {
        return addSertificate({ code: payload, data: state.checkoutData })
            .then(data => commit(SET_DATA, data))
            .catch(error => $logger.error(`${ADD_SERTIFICATE} ${error}`));
    },

    [DELETE_SERTIFICATE]({ commit, state }, payload) {
        return deleteSertificate({ sertificate: payload, data: state.checkoutData })
            .then(data => commit(SET_DATA, data))
            .catch(error => $logger.error(`${DELETE_SERTIFICATE} ${error}`));
    },

    [ADD_PROMOCODE]({ commit, state }, payload) {
        return addPromocode({ promocode: payload, data: state.checkoutData })
            .then(data => commit(SET_DATA, data))
            .catch(error => $logger.error(`${ADD_PROMOCODE} ${error}`));
    },

    [DELETE_PROMOCODE]({ commit, state }, payload) {
        return deletePromocode({ promocode: payload, data: state.checkoutData })
            .then(data => commit(SET_DATA, data))
            .catch(error => $logger.error(`${DELETE_PROMOCODE} ${error}`));
    },

    [ADD_ADDRESS]({ commit }, payload) {
        commit(M_ADD_ADDRESS, payload);
    },

    [CHANGE_PACKAGE_DATE]({ commit, state }, payload) {
        if (!state.selectedPackage) return;
        commit(SET_PACKAGE_DATE, payload);
    },

    [FETCH_CONFIRMATION_TYPES]({ commit }, payload) {
        return getCheckoutConfirmationTypes(payload)
            .then(data => commit(SET_CONFIRMATION_TYPES, data))
            .catch(error => $logger.error(`${FETCH_CONFIRMATION_TYPES} ${error}`));
    },

    [FETCH_PAYMENT_METHODS]({ commit }, payload) {
        return getCheckoutPaymentMethods(payload)
            .then(data => commit(SET_PAYMENT_METHODS, data))
            .catch(error => $logger.error(`${FETCH_PAYMENT_METHODS} ${error}`));
    },

    [FETCH_DELIVERY_TYPES]({ commit }, payload) {
        return getCheckoutDeliveryTypes(payload)
            .then(data => commit(SET_DELIVERY_TYPES, data))
            .catch(error => $logger.error(`${FETCH_DELIVERY_TYPES} ${error}`));
    },

    [FETCH_RECEIVE_METHODS]({ commit }, payload) {
        return getCheckoutReceiveMethods(payload)
            .then(data => commit(SET_RECEIVE_METHODS, data))
            .catch(error => $logger.error(`${FETCH_RECEIVE_METHODS} ${error}`));
    },

    [FETCH_ADDRESSES]({ commit }, payload) {
        return getCheckoutAddresses(payload)
            .then(data => commit(SET_ADDRESSES, data))
            .catch(error => $logger.error(`${FETCH_ADDRESSES} ${error}`));
    },

    [FETCH_PICKUP_POINTS]({ commit }, payload) {
        return getCheckoutPickupPoints(payload)
            .then(data => commit(SET_PICKUP_POINTS, data))
            .catch(error => $logger.error(`${FETCH_PICKUP_POINTS} ${error}`));
    },

    [FETCH_PACKAGES]({ commit }, payload) {
        return getCheckoutPackages(payload)
            .then(data => {
                commit(SET_PACKAGES, data);
                commit(M_SET_SELECTED_PACKAGE, data[0]);
            })
            .catch(error => $logger.error(`${FETCH_PACKAGES} ${error}`));
    },

    [FETCH_DATA]({ commit, dispatch, state }, payload) {
        return getCheckoutData(payload)
            .then(data => {
                commit(SET_TYPE, payload);
                commit(SET_DATA, data);
                commit(M_SET_SELECTED_ADDRESS, state.addresses[0]);
                return dispatch(SET_RECEIVE_METHOD, state.receiveMethods[0]);
            })
            .catch(error => $logger.error(`${FETCH_DATA} ${error}`));
    },

    [FETCH_CHECKOUT_DATA]({ dispatch }, type) {
        return Promise.all([
            dispatch(FETCH_DELIVERY_TYPES, type),
            dispatch(FETCH_CONFIRMATION_TYPES, type),
            dispatch(FETCH_RECEIVE_METHODS, type),
            dispatch(FETCH_PAYMENT_METHODS, type),
            dispatch(FETCH_ADDRESSES),
        ]).then(() => dispatch(FETCH_DATA, type));
    },
};
