import { $logger } from '../../../services/ServiceLocator';
import {
    getCheckoutAddresses,
    getCheckoutConfirmationTypes,
    getCheckoutDeliveryMethods,
    getCheckoutDeliveryTypes,
    getCheckoutPaymentMethods,
    getCheckoutData,
} from '../../../api';
import {
    SET_DATA,
    SET_CONFIRMATION_TYPES,
    SET_DELIVERY_TYPES,
    SET_PAYMENT_METHODS,
    SET_DELIVERY_METHODS,
    SET_ADDRESSES,
} from './mutations';

export const FETCH_CHECKOUT_DATA = 'FETCH_CHECKOUT_DATA';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_PAYMENT_METHODS = 'FETCH_PAYMENT_METHODS';
export const FETCH_DELIVERY_METHODS = 'FETCH_DELIVERY_METHODS';
export const FETCH_DELIVERY_TYPES = 'FETCH_DELIVERY_TYPES';
export const FETCH_CONFIRMATION_TYPES = 'FETCH_CONFIRMATION_TYPES';
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';

export default {
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
        return getCheckoutAddresses(payload)
            .then(data => commit(SET_ADDRESSES, data))
            .catch(error => $logger.error(`${FETCH_ADDRESSES} ${error}`));
    },

    [FETCH_DATA]({ commit, dispatch }, payload) {
        return getCheckoutData(payload)
            .then(data => {
                commit(SET_DATA, data);
                dispatch(FETCH_ADDRESSES, data.deliveryMethod);
            })
            .catch(error => $logger.error(`${FETCH_DATA} ${error}`));
    },

    [FETCH_CHECKOUT_DATA]({ dispatch }, { type }) {
        return Promise.all([
            dispatch(FETCH_CONFIRMATION_TYPES, type),
            dispatch(FETCH_DELIVERY_METHODS, type),
            dispatch(FETCH_DELIVERY_TYPES, type),
            dispatch(FETCH_PAYMENT_METHODS, type),
        ]).then(() => dispatch(FETCH_DATA));
    },
};
