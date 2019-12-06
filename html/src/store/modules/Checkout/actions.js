import { $logger } from '../../../services/ServiceLocator';
import { requestStatus } from '../../../assets/scripts/constants';

import { RECEIVE_METHOD_STATUS, ADDRESS_STATUS, BONUS_STATUS, CERTIFICATE_STATUS, PROMOCODE_STATUS } from './getters';

import {
    SET_DATA,
    SET_TYPE,
    SET_STATUS,
    SET_AGREEMENT as M_SET_AGREEMENT,
    SET_SUBSCRIBE as M_SET_SUBSCRIBE,
    SET_RECIPIENT as M_SET_RECIPIENT,
    SET_DELIVERY_TYPE as M_SET_DELIVERY_TYPE,
    SET_CONFIRMATION_TYPE as M_SET_CONFIRMATION_TYPE,
    CHANGE_CHUNK_DATE as M_CHANGE_CHUNK_DATE,
    ADD_ADDRESS as M_ADD_ADDRESS,
} from './mutations';

import {
    getCheckoutData,
    setReceiveMethod,
    setAddress,
    setPickupPoint,
    addBonus,
    deleteBonus,
    addCertificate,
    deleteCertificate,
    addPromocode,
    deletePromocode,
    commitCheckoutData,
} from '../../../api';

export const SET_RECIPIENT = 'SET_RECIPIENT';
export const SET_RECEIVE_METHOD = 'SET_RECEIVE_METHOD';
export const SET_DELIVERY_TYPE = 'SET_DELIVERY_TYPE';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_PICKUP_POINT = 'SET_PICKUP_POINT';
export const SET_AGREEMENT = 'SET_AGREEMENT';
export const SET_SUBSCRIBE = 'SET_SUBSCRIBE';
export const SET_CONFIRMATION_TYPE = 'SET_CONFIRMATION_TYPE';

export const ADD_BONUS = 'ADD_BONUS';
export const DELETE_BONUS = 'DELETE_BONUS';

export const ADD_CERTIFICATE = 'ADD_CERTIFICATE';
export const DELETE_CERTIFICATE = 'DELETE_CERTIFICATE';

export const ADD_PROMOCODE = 'ADD_PROMOCODE';
export const DELETE_PROMOCODE = 'DELETE_PROMOCODE';

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const CHANGE_ADDRESS = 'CHANGE_ADDRESS';

export const FETCH_CHECKOUT_DATA = 'FETCH_CHECKOUT_DATA';
export const CHANGE_CHUNK_DATE = 'CHANGE_CHUNK_DATE';

export const COMMIT_DATA = 'COMMIT_DATA';

export default {
    [SET_RECEIVE_METHOD]({ commit, state }, payload) {
        commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.PENDING });
        return setReceiveMethod({ method: payload, data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.ERROR });
                $logger.error(`${SET_RECEIVE_METHOD} ${error}`);
            });
    },

    [SET_ADDRESS]({ commit, state }, payload) {
        commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.PENDING });
        return setAddress({ address: payload, data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.ERROR });
                $logger.error(`${SET_ADDRESS} ${error}`);
            });
    },

    [SET_PICKUP_POINT]({ commit, state }, payload) {
        commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.PENDING });
        return setPickupPoint({ pickupPoint: payload, data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.ERROR });
                $logger.error(`${SET_PICKUP_POINT} ${error}`);
            });
    },

    [ADD_BONUS]({ commit, state }, payload) {
        commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.PENDING });
        return addBonus({ bonus: payload, data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.ERROR });
                $logger.error(`${ADD_BONUS} ${error}`);
            });
    },

    [DELETE_BONUS]({ commit, state }) {
        commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.PENDING });
        return deleteBonus({ data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.ERROR });
                $logger.error(`${DELETE_BONUS} ${error}`);
            });
    },

    [ADD_CERTIFICATE]({ commit, state }, payload) {
        commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.PENDING });
        return addCertificate({ code: payload, data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.ERROR });
                $logger.error(`${ADD_CERTIFICATE} ${error}`);
            });
    },

    [DELETE_CERTIFICATE]({ commit, state }, payload) {
        commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.PENDING });
        return deleteCertificate({ code: payload, data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.ERROR });
                $logger.error(`${DELETE_CERTIFICATE} ${error}`);
            });
    },

    [ADD_PROMOCODE]({ commit, state }, payload) {
        commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.PENDING });
        return addPromocode({ promocode: payload, data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.ERROR });
                $logger.error(`${ADD_PROMOCODE} ${error}`);
            });
    },

    [DELETE_PROMOCODE]({ commit, state }) {
        commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.PENDING });
        return deletePromocode({ data: state.checkoutData })
            .then(data => {
                commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.SUCCESS });
                commit(SET_DATA, data);
            })
            .catch(error => {
                commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.ERROR });
                $logger.error(`${DELETE_PROMOCODE} ${error}`);
            });
    },

    [ADD_ADDRESS]({ dispatch, commit }, payload) {
        commit(M_ADD_ADDRESS, payload);
        return dispatch(SET_ADDRESS, payload);
    },

    [SET_CONFIRMATION_TYPE]({ commit }, payload) {
        commit(M_SET_CONFIRMATION_TYPE, payload);
    },

    [SET_AGREEMENT]({ commit }, payload) {
        commit(M_SET_AGREEMENT, payload);
    },

    [SET_SUBSCRIBE]({ commit }, payload) {
        commit(M_SET_SUBSCRIBE, payload);
    },

    [SET_RECIPIENT]({ commit }, payload) {
        commit(M_SET_RECIPIENT, payload);
    },

    [SET_DELIVERY_TYPE]({ commit }, payload) {
        commit(M_SET_DELIVERY_TYPE, payload);
    },

    [CHANGE_CHUNK_DATE]({ commit }, payload) {
        commit(M_CHANGE_CHUNK_DATE, payload);
    },

    [COMMIT_DATA]({ state }) {
        return commitCheckoutData({ data: state.checkoutData })
            .then(data => data)
            .catch(error => $logger.error(`${COMMIT_DATA} ${error}`));
    },

    [FETCH_CHECKOUT_DATA]({ commit }, payload) {
        return getCheckoutData(payload)
            .then(data => {
                commit(SET_TYPE, payload);
                commit(SET_DATA, data);
            })
            .catch(error => $logger.error(`${FETCH_CHECKOUT_DATA} ${error}`));
    },
};
