import { $logger } from '../../../services/ServiceLocator';
import {
    getCheckoutAddresses,
    getCheckoutConfirmationTypes,
    getCheckoutDeliveryMethods,
    getCheckoutDeliveryTypes,
    getCheckoutPaymentMethods,
    getCheckoutData,
    getCheckoutPackages,
} from '../../../api';
import {
    SET_DATA,
    SET_CONFIRMATION_TYPES,
    SET_DELIVERY_TYPES,
    SET_PAYMENT_METHODS,
    SET_DELIVERY_METHODS,
    SET_ADDRESSES,
    SET_PACKAGES,
    SET_DATA_PROP as M_SET_DATA_PROP,
    SET_TYPE,
} from './mutations';

export const SET_DATA_PROP = 'SET_DATA_PROP';

export const FETCH_CHECKOUT_DATA = 'FETCH_CHECKOUT_DATA';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_PAYMENT_METHODS = 'FETCH_PAYMENT_METHODS';
export const FETCH_DELIVERY_METHODS = 'FETCH_DELIVERY_METHODS';
export const FETCH_DELIVERY_TYPES = 'FETCH_DELIVERY_TYPES';
export const FETCH_CONFIRMATION_TYPES = 'FETCH_CONFIRMATION_TYPES';
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const FETCH_PACKAGES = 'FETCH_PACKAGES';

export default {
    [SET_DATA_PROP]({ commit }, payload) {
        commit(M_SET_DATA_PROP, payload);
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
        return getCheckoutDeliveryMethods(payload)
            .then(data => commit(SET_DELIVERY_METHODS, data))
            .catch(error => $logger.error(`${FETCH_DELIVERY_METHODS} ${error}`));
    },

    [FETCH_ADDRESSES]({ commit }, payload) {
        commit(SET_ADDRESSES, []);
        return getCheckoutAddresses(payload)
            .then(data => commit(SET_ADDRESSES, data))
            .catch(error => $logger.error(`${FETCH_ADDRESSES} ${error}`));
    },

    [FETCH_PACKAGES]({ commit }, payload) {
        commit(SET_PACKAGES, {});
        return getCheckoutPackages(payload)
            .then(data => commit(SET_PACKAGES, data))
            .catch(error => $logger.error(`${FETCH_PACKAGES} ${error}`));
    },

    [FETCH_DATA]({ commit, dispatch }, payload) {
        return getCheckoutData(payload)
            .then(data => {
                commit(SET_TYPE, payload);
                commit(SET_DATA, data);
                return Promise.all([
                    dispatch(FETCH_ADDRESSES, data.deliveryMethodID),
                    dispatch(FETCH_PACKAGES, data.deliveryTypeID),
                ]);
            })
            .catch(error => $logger.error(`${FETCH_DATA} ${error}`));
    },

    [FETCH_CHECKOUT_DATA]({ dispatch }, type) {
        return Promise.all([
            dispatch(FETCH_DELIVERY_TYPES, type),
            dispatch(FETCH_CONFIRMATION_TYPES, type),
            dispatch(FETCH_DELIVERY_METHODS, type),
            dispatch(FETCH_PAYMENT_METHODS, type),
        ]).then(() => dispatch(FETCH_DATA, type));
    },
};
