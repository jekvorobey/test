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
    SET_DELIVERY_TYPE as M_SET_DELIVERY_TYPE,
} from './mutations';

import { receiveTypes } from '../../../assets/scripts/constants';

export const SET_DATA_PROP = 'SET_DATA_PROP';
export const SET_RECEIVE_METHOD = 'SET_RECEIVE_METHOD';
export const SET_DELIVERY_TYPE = 'SET_DELIVERY_TYPE';
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';

export const FETCH_CHECKOUT_DATA = 'FETCH_CHECKOUT_DATA';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_PAYMENT_METHODS = 'FETCH_PAYMENT_METHODS';
export const FETCH_DELIVERY_METHODS = 'FETCH_DELIVERY_METHODS';
export const FETCH_DELIVERY_TYPES = 'FETCH_DELIVERY_TYPES';
export const FETCH_CONFIRMATION_TYPES = 'FETCH_CONFIRMATION_TYPES';
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const FETCH_PICKUP_POINTS = 'FETCH_PICKUP_POINTS';
export const FETCH_PACKAGES = 'FETCH_PACKAGES';

export default {
    [SET_DATA_PROP]({ commit }, payload) {
        commit(M_SET_DATA_PROP, payload);
    },

    [SET_SELECTED_ADDRESS]({ commit, dispatch }, payload) {
        commit(M_SET_SELECTED_ADDRESS, payload);
        commit(M_SET_DATA_PROP, { prop: 'address', value: payload.id ? { id: payload.id } : payload });
        return dispatch(FETCH_PACKAGES, { id: payload.id, methodID: payload.methodID });
    },

    [SET_SELECTED_PICKUP_POINT]({ commit, dispatch }, payload) {
        commit(M_SET_SELECTED_PICKUP_POINT, payload);
        commit(M_SET_DATA_PROP, { prop: 'pickupPoint', value: payload });
        commit(M_SET_DATA_PROP, { prop: 'deliveryMethodID', value: payload ? payload.methodID : null });
        if (payload) return dispatch(FETCH_PACKAGES, { id: payload.id, methodID: payload.methodID });
        return Promise.resolve();
    },

    [SET_RECEIVE_METHOD]({ commit, dispatch, state }, payload) {
        commit(M_SET_RECEIVE_METHOD, payload);
        commit(M_SET_DATA_PROP, { prop: 'receiveMethodID', value: payload.id });

        if (payload.id === receiveTypes.DELIVERY || payload.id === receiveTypes.EXPRESS) {
            const defaultMethodID = payload.methods[0].id;
            commit(M_SET_SELECTED_PICKUP_POINT, null);
            commit(M_SET_DATA_PROP, { prop: 'pickupPoint', value: null });
            commit(M_SET_DATA_PROP, { prop: 'deliveryMethodID', value: defaultMethodID });
            dispatch(FETCH_PACKAGES, { id: state.selectedAddress, methodID: state.selectedAddress.methodID });
        } else commit(M_SET_DATA_PROP, { prop: 'deliveryMethodID', value: null });
    },

    [SET_DELIVERY_TYPE]({ commit }, payload) {
        commit(M_SET_DELIVERY_TYPE, payload);
        commit(M_SET_DATA_PROP, { prop: 'deliveryTypeID', value: payload.id });
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

    [FETCH_DELIVERY_METHODS]({ commit }, payload) {
        return getCheckoutReceiveMethods(payload)
            .then(data => commit(SET_RECEIVE_METHODS, data))
            .catch(error => $logger.error(`${FETCH_DELIVERY_METHODS} ${error}`));
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
            .then(data => commit(SET_PACKAGES, data))
            .catch(error => $logger.error(`${FETCH_PACKAGES} ${error}`));
    },

    [FETCH_DATA]({ commit, dispatch, state }, payload) {
        return getCheckoutData(payload)
            .then(data => {
                commit(SET_TYPE, payload);
                commit(SET_DATA, data);
                return dispatch(SET_SELECTED_ADDRESS, state.addresses[0]);
            })
            .catch(error => $logger.error(`${FETCH_DATA} ${error}`));
    },

    [FETCH_CHECKOUT_DATA]({ dispatch }, type) {
        return Promise.all([
            dispatch(FETCH_DELIVERY_TYPES, type),
            dispatch(FETCH_CONFIRMATION_TYPES, type),
            dispatch(FETCH_DELIVERY_METHODS, type),
            dispatch(FETCH_PAYMENT_METHODS, type),
            dispatch(FETCH_ADDRESSES),
        ]).then(() => dispatch(FETCH_DATA, type));
    },
};
