import { requestStatus } from '@enums';
import { storeErrorHandler } from '@util/store';

import {
    getCheckoutOrder,
    getCheckoutData,
    getCurrentDataPoint,
    setReceiveMethod,
    setAddress,
    setPickupPoint,
    setPaymentMethod,
    setPublicEventPaymentMethod,
    changeBonus,
    addCertificate,
    deleteCertificate,
    addPromocode,
    deletePromocode,
    commitCheckoutData,
    changeCity,
    changeCheckoutMasterclassTickets,
    getProfessions,
    getCheckoutReceiveMethods,
    setPoscreditSaveProfile,
    setPoscreditCheckStatus
} from '@api';

import {
    RECEIVE_METHOD_STATUS,
    ADDRESS_STATUS,
    PAYMENT_METHOD_STATUS,
    BONUS_STATUS,
    CERTIFICATE_STATUS,
    PROMOCODE_STATUS,
    TICKET_STATUS,
    CHECKOUT_FIRST_LOADED,
} from './getters';

import { CHECKOUT_DATA } from '@store/modules/Checkout/index';

import {
    SET_CHECKOUT_ORDER,
    SET_DATA,
    SET_TYPE,
    SET_PROFESSIONS,
    SET_STATUS,
    SET_AGREEMENT as M_SET_AGREEMENT,
    SET_SUBSCRIBE as M_SET_SUBSCRIBE,
    SET_RECIPIENT as M_SET_RECIPIENT,
    SET_DELIVERY_TYPE as M_SET_DELIVERY_TYPE,
    SET_CONFIRMATION_TYPE as M_SET_CONFIRMATION_TYPE,
    CHANGE_CHUNK_DATE as M_CHANGE_CHUNK_DATE,
    ADD_ADDRESS as M_ADD_ADDRESS,
    CHANGE_ADDRESS as M_CHANGE_ADDRESS,
    ADD_RECIPIENT as M_ADD_RECIPIENT,
    CHANGE_RECIPIENT as M_CHANGE_RECIPIENT,
    SET_CITY_FIAS as M_SET_CITY_FIAS,
    SET_SELECTED_PICKUP_POINT as M_SET_SELECTED_PICKUP_POINT,
} from './mutations';

export const FETCH_PROFESSIONS = 'FETCH_PROFESSIONS';

export const SET_RECEIVE_METHOD = 'SET_RECEIVE_METHOD';
export const SET_DELIVERY_TYPE = 'SET_DELIVERY_TYPE';
export const SET_PICKUP_POINT = 'SET_PICKUP_POINT';
export const FETCH_CURRENT_PICKUP_POINT = 'FETCH_CURRENT_PICKUP_POINT'
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const SET_PUBLIC_EVENT_PAYMENT_METHOD = 'SET_PUBLIC_EVENT_PAYMENT_METHOD';
export const SET_AGREEMENT = 'SET_AGREEMENT';
export const SET_SUBSCRIBE = 'SET_SUBSCRIBE';
export const SET_CONFIRMATION_TYPE = 'SET_CONFIRMATION_TYPE';
export const CHANGE_CITY = 'CHANGE_CITY';
export const SET_CITY_FIAS = 'SET_CITY_FIAS';
export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';

export const ADD_BONUS = 'ADD_BONUS';
export const DELETE_BONUS = 'DELETE_BONUS';

export const ADD_CERTIFICATE = 'ADD_CERTIFICATE';
export const DELETE_CERTIFICATE = 'DELETE_CERTIFICATE';

export const ADD_PROMOCODE = 'ADD_PROMOCODE';
export const DELETE_PROMOCODE = 'DELETE_PROMOCODE';

export const SET_RECIPIENT = 'SET_RECIPIENT';
export const ADD_RECIPIENT = 'ADD_RECIPIENT';
export const CHANGE_RECIPIENT = 'CHANGE_RECIPIENT';

export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_ADDRESS_NO_LK = 'SET_ADDRESS_NO_LK';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const CHANGE_ADDRESS = 'CHANGE_ADDRESS';

export const FETCH_CHECKOUT_DATA = 'FETCH_CHECKOUT_DATA';
export const CLEAR_CHECKOUT_DATA = 'CLEAR_CHECKOUT_DATA';
export const FETCH_CHECKOUT_RECEIVE_METHODS = 'FETCH_CHECKOUT_RECEIVE_METHODS';
export const CHANGE_CHUNK_DATE = 'CHANGE_CHUNK_DATE';
export const COMMIT_DATA = 'COMMIT_DATA';

export const ADD_TICKET = 'ADD_TICKET';
export const CHANGE_TICKET = 'CHANGE_TICKET';

export const FETCH_CHECKOUT_ORDER = 'FETCH_CHECKOUT_ORDER';

export const SET_POSCREDIT_SAVE_PROFILE = 'SET_POSCREDIT_SAVE_PROFILE';
export const SET_POSCREDIT_CHECK_STATUS = 'SET_POSCREDIT_CHECK_STATUS';

export default {
    async [FETCH_PROFESSIONS]({ commit }) {
        try {
            const { items } = await getProfessions();
            commit(SET_PROFESSIONS, items);
        } catch (error) {
            storeErrorHandler(FETCH_PROFESSIONS)(error);
        }
    },

    async [CHANGE_CITY]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.PENDING });
            const data = await changeCity({ city: payload, data: state.checkoutData });
            commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(CHANGE_CITY, true)(error);
        }
    },

    async [SET_RECEIVE_METHOD]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.PENDING });
            const data = await setReceiveMethod({ method: payload, data: state.checkoutData });
            commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: RECEIVE_METHOD_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(SET_RECEIVE_METHOD, true)(error);
        }
    },

    async [SET_ADDRESS]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.PENDING });
            let data = await setAddress({ save2Lk: true, address: payload, data: state.checkoutData });

            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(SET_ADDRESS, true)(error);
        }
    },

    async [SET_ADDRESS_NO_LK]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.PENDING });
            const data = await setAddress({ save2Lk: false, address: payload, data: state.checkoutData });
            data.addresses = data.addresses.filter((item) => {
                return item.geo_lat && item.geo_lon;
            });
            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(SET_ADDRESS_NO_LK, true)(error);
        }
    },

    async [SET_PICKUP_POINT]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.PENDING });
            const data = await setPickupPoint({ pickupPoint: payload, data: state.checkoutData });
            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: ADDRESS_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(SET_PICKUP_POINT, true)(error);
        }
    },

    async [FETCH_CURRENT_PICKUP_POINT]({}, id) {
        try {
            return await getCurrentDataPoint(id);
        } catch (error) {
            storeErrorHandler(FETCH_CURRENT_PICKUP_POINT, true)(error);
        }
    },

    async [SET_PAYMENT_METHOD]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: PAYMENT_METHOD_STATUS, value: requestStatus.PENDING });
            const data = await setPaymentMethod({ payment: payload, data: state.checkoutData });
            commit(SET_STATUS, { name: PAYMENT_METHOD_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: PAYMENT_METHOD_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(SET_PAYMENT_METHOD, true)(error);
        }
    },

    async [SET_PUBLIC_EVENT_PAYMENT_METHOD]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: PAYMENT_METHOD_STATUS, value: requestStatus.PENDING });
            const data = await setPublicEventPaymentMethod({ payment: payload, data: state.checkoutData });
            commit(SET_STATUS, { name: PAYMENT_METHOD_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: PAYMENT_METHOD_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(SET_PUBLIC_EVENT_PAYMENT_METHOD, true)(error);
        }
    },

    async [ADD_BONUS]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.PENDING });
            const data = await changeBonus({ bonus: payload, data: state.checkoutData });
            commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(ADD_BONUS, true)(error);
        }
    },

    async [DELETE_BONUS]({ commit, state }) {
        try {
            commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.PENDING });
            const data = await changeBonus({ bonus: 0, data: state.checkoutData });
            commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: BONUS_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(DELETE_BONUS, true)(error);
        }
    },

    async [ADD_CERTIFICATE]({ commit, state }, payload) {
        try {
            const { checkoutType } = state;
            commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.PENDING });
            const data = await addCertificate(checkoutType, { price: payload, data: state.checkoutData });
            commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(ADD_CERTIFICATE, true)(error);
        }
    },

    async [DELETE_CERTIFICATE]({ commit, state }, payload) {
        try {
            commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.PENDING });
            const data = await deleteCertificate({ code: payload, data: state.checkoutData });
            commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.SUCCESS });
            commit(SET_DATA, data);
        } catch (error) {
            commit(SET_STATUS, { name: CERTIFICATE_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(DELETE_CERTIFICATE, true)(error);
        }
    },

    async [ADD_PROMOCODE]({ commit, state }, payload) {
        try {
            const { checkoutType } = state;
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.PENDING });
            const data = await addPromocode(checkoutType, { promoCode: payload, data: state.checkoutData });
            commit(SET_DATA, data);
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.SUCCESS });
        } catch (error) {
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(ADD_PROMOCODE, true)(error);
        }
    },

    async [DELETE_PROMOCODE]({ commit, state }) {
        try {
            const { checkoutType } = state;
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.PENDING });
            const data = await deletePromocode(checkoutType, { data: state.checkoutData });
            commit(SET_DATA, data);
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.SUCCESS });
        } catch (error) {
            commit(SET_STATUS, { name: PROMOCODE_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(DELETE_PROMOCODE, true)(error);
        }
    },

    [CHANGE_ADDRESS]({ dispatch }, address) {
        return dispatch(SET_ADDRESS, address);
    },

    [ADD_ADDRESS]({ dispatch }, address) {
        return dispatch(SET_ADDRESS, address);
    },

    [CHANGE_RECIPIENT]({ dispatch, commit }, payload = {}) {
        const { recipient } = payload;
        commit(M_CHANGE_RECIPIENT, payload);
        return dispatch(SET_RECIPIENT, recipient);
    },

    [ADD_RECIPIENT]({ commit }, recipient) {
        commit(M_ADD_RECIPIENT, recipient);
    },

    [SET_RECIPIENT]({ commit }, payload) {
        commit(M_SET_RECIPIENT, payload);
    },

    async [CHANGE_TICKET]({ state, commit }, payload = {}) {
        try {
            commit(SET_STATUS, { name: TICKET_STATUS, value: requestStatus.PENDING });
            const { ticket, index, offerId } = payload;
            const { publicEvents = [] } = state.checkoutData;
            const event = publicEvents.find((e) => e.offerId === offerId);

            if (event) {
                const existTicket = event.tickets[index];
                Object.assign(existTicket, ticket);
                const data = await changeCheckoutMasterclassTickets({ offerId: event.offerId, tickets: event.tickets },
                    state.checkoutData
                );
                commit(SET_DATA, data);
            }
            commit(SET_STATUS, { name: TICKET_STATUS, value: requestStatus.SUCCESS });
        } catch (error) {
            commit(SET_STATUS, { name: TICKET_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(CHANGE_TICKET)(error);
        }
    },

    async [ADD_TICKET]({ state, commit }, payload = {}) {
        try {
            commit(SET_STATUS, { name: TICKET_STATUS, value: requestStatus.PENDING });
            const { ticket, offerId } = payload;
            const { publicEvents = [] } = state.checkoutData;
            const event = publicEvents.find((e) => e.offerId === offerId);
            if (event) {
                const data = await changeCheckoutMasterclassTickets({ offerId: event.offerId, tickets: [...event.tickets, ticket] },
                    state.checkoutData
                );
                commit(SET_DATA, data);
            }
            commit(SET_STATUS, { name: TICKET_STATUS, value: requestStatus.SUCCESS });
        } catch (error) {
            commit(SET_STATUS, { name: TICKET_STATUS, value: requestStatus.ERROR });
            storeErrorHandler(ADD_TICKET, true)(error);
        }
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

    [SET_DELIVERY_TYPE]({ commit }, payload) {
        commit(M_SET_DELIVERY_TYPE, payload);
    },

    [CHANGE_CHUNK_DATE]({ commit }, payload) {
        commit(M_CHANGE_CHUNK_DATE, payload);
    },

    [CLEAR_CHECKOUT_DATA]({ commit }) {
        commit(SET_DATA);
    },

    async [COMMIT_DATA]({ state }) {
        try {
            const { checkoutType, checkoutData } = state;
            return await commitCheckoutData(checkoutType, { data: checkoutData });
        } catch (error) {
            storeErrorHandler(COMMIT_DATA, true)(error);
        }
    },

    async [FETCH_CHECKOUT_ORDER]({ commit }, id) {
        try {
            const data = await getCheckoutOrder(id);
            commit(SET_CHECKOUT_ORDER, data);
        } catch (error) {
            storeErrorHandler(FETCH_CHECKOUT_ORDER, true)(error);
        }
    },
    async [SET_POSCREDIT_SAVE_PROFILE]({}, payload) {
        console.log('SET_POSCREDIT_SAVE_PROFILE payload ', payload)
        try {
            await setPoscreditSaveProfile(payload);
        } catch (error) {
            storeErrorHandler(SET_POSCREDIT_SAVE_PROFILE, true)(error);
        }
    },
    async [SET_POSCREDIT_CHECK_STATUS]({}, payload) {
        console.log('SET_POSCREDIT_CHECK_STATUS payload ', payload)
        try {
            await setPoscreditCheckStatus(payload);
        } catch (error) {
            storeErrorHandler(SET_POSCREDIT_CHECK_STATUS, true)(error);
        }
    },
    async [FETCH_CHECKOUT_DATA]({ commit }, type) {
        try {
            const data = await getCheckoutData(type);
            commit(SET_TYPE, type);
            commit(SET_DATA, data);
        } catch (error) {
            Sentry.captureException(error);
            storeErrorHandler(FETCH_CHECKOUT_DATA, true)(error);
        }
    },

    async [FETCH_CHECKOUT_RECEIVE_METHODS]({ commit, state }) {
        try {
            const data = await getCheckoutReceiveMethods();

            commit(
                SET_DATA,
                Object.assign(state[CHECKOUT_DATA], {
                    receiveMethods: data,
                    test: data,
                })
            );
        } catch (error) {
            Sentry.captureException(error);
            storeErrorHandler(FETCH_CHECKOUT_RECEIVE_METHODS, true)(error);
        }
    },

    [SET_CITY_FIAS]({ commit }, payload) {
        commit(M_SET_CITY_FIAS, payload);
    },

    [SET_SELECTED_PICKUP_POINT]({ commit }, payload) {
        commit(M_SET_SELECTED_PICKUP_POINT, payload);
    },


};
