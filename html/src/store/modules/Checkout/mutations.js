export const SET_DATA = 'SET_DATA';
export const SET_TYPE = 'SET_TYPE';
export const SET_STATUS = 'SET_STATUS';

export const SET_RECIPIENT = 'SET_RECIPIENT';
export const SET_AGREEMENT = 'SET_AGREEMENT';
export const SET_SUBSCRIBE = 'SET_SUBSCRIBE';
export const SET_DELIVERY_TYPE = 'SET_DELIVERY_TYPE';
export const SET_CONFIRMATION_TYPE = 'SET_CONFIRMATION_TYPE';

export const CHANGE_CHUNK_DATE = 'CHANGE_CHUNK_DATE';

export const ADD_ADDRESS = 'ADD_ADDRESS';

export default {
    [SET_STATUS](state, payload = {}) {
        state.checkoutStatus[payload.name] = payload.value;
    },

    [SET_TYPE](state, payload = null) {
        state.checkoutType = payload;
    },

    [SET_DATA](state, payload = {}) {
        state.checkoutData = payload;
    },

    [SET_AGREEMENT](state, payload) {
        state.checkoutData.input.agreement = payload;
    },

    [SET_SUBSCRIBE](state, payload) {
        state.checkoutData.input.subscribe = payload;
    },

    [SET_RECIPIENT](state, payload = {}) {
        state.checkoutData.input.recipient = payload;
    },

    [SET_DELIVERY_TYPE](state, payload) {
        state.checkoutData.input.deliveryType = payload;
    },

    [SET_CONFIRMATION_TYPE](state, payload) {
        state.checkoutData.input.confirmationTypeID = payload;
    },

    [CHANGE_CHUNK_DATE](state, { id, selectedDate }) {
        const chunkItem = state.checkoutData.input.deliveryType.items.find(i => i.id === id);
        if (!chunkItem) return;
        chunkItem.selectedDate = selectedDate;
    },

    [ADD_ADDRESS](state, payload) {
        state.checkoutData.addresses.push(payload);
    },
};
