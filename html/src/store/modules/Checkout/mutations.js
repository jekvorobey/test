export const SET_DATA = 'SET_DATA';
export const SET_TYPE = 'SET_TYPE';
export const SET_STATUS = 'SET_STATUS';

export const SET_AGREEMENT = 'SET_AGREEMENT';
export const SET_SUBSCRIBE = 'SET_SUBSCRIBE';
export const SET_DELIVERY_TYPE = 'SET_DELIVERY_TYPE';
export const SET_CONFIRMATION_TYPE = 'SET_CONFIRMATION_TYPE';

export const CHANGE_CHUNK_DATE = 'CHANGE_CHUNK_DATE';

export const ADD_ADDRESS = 'ADD_ADDRESS';
export const CHANGE_ADDRESS = 'CHANGE_ADDRESS';

export const SET_RECIPIENT = 'SET_RECIPIENT';
export const ADD_RECIPIENT = 'ADD_RECIPIENT';
export const CHANGE_RECIPIENT = 'CHANGE_RECIPIENT';

export const SET_PROFESSIONS = 'SET_PROFESSIONS';
export const SET_CHECKOUT_ORDER = 'SET_CHECKOUT_ORDER';

export const SET_CITY_FIAS = 'SET_CITY_FIAS';

export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';

export default {
    [SET_STATUS](state, payload = {}) {
        state.checkoutStatus[payload.name] = payload.value;
    },

    [SET_TYPE](state, payload = null) {
        state.checkoutType = payload;
    },

    [SET_DATA](state, payload = null) {
        state.checkoutData = payload;
    },

    [SET_PROFESSIONS](state, payload) {
        state.professions = payload || [];
    },

    [SET_AGREEMENT](state, payload) {
        state.checkoutData.input.agreement = payload;
    },

    [SET_SUBSCRIBE](state, payload) {
        state.checkoutData.input.subscribe = payload;
    },

    [SET_DELIVERY_TYPE](state, payload) {
        state.checkoutData.input.deliveryType = payload;
    },

    [SET_CONFIRMATION_TYPE](state, payload) {
        state.checkoutData.input.confirmationTypeID = payload;
    },

    [CHANGE_CHUNK_DATE](state, { id, selectedDate, selectedTime }) {
        const chunkItem = state.checkoutData.input.deliveryType.items.find((i) => i.id === id);
        if (!chunkItem) return;
        chunkItem.selectedDate = selectedDate || null;
        chunkItem.selectedTime = selectedTime || null;
    },

    [ADD_ADDRESS](state, payload) {
        state.checkoutData.addresses.push(payload);
    },

    [CHANGE_ADDRESS](state, { index, address }) {
        const existAddress = state.checkoutData.addresses[index];
        if (existAddress) Object.assign(existAddress, address);
    },

    [SET_RECIPIENT](state, payload = {}) {
        state.checkoutData.input.recipient = payload;
    },

    [ADD_RECIPIENT](state, payload) {
        state.checkoutData.recipients.push(payload);
        state.checkoutData.input.recipient = payload;
    },

    [CHANGE_RECIPIENT](state, { index, recipient }) {
        const existRecipient = state.checkoutData.recipients[index];
        if (existRecipient) Object.assign(existRecipient, recipient);
        state.checkoutData.input.recipient = existRecipient;
    },

    [SET_CHECKOUT_ORDER](state, payload) {
        state.order = payload;
    },

    [SET_CITY_FIAS](state, payload) {
        state.cityFias = payload;
    },

    [SET_SELECTED_PICKUP_POINT](state, payload) {
        state.checkoutData.input.pickupPoint = payload;
    },
};