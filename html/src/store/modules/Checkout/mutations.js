export const SET_DATA = 'SET_DATA';
export const SET_TYPE = 'SET_TYPE';
export const SET_DATA_PROP = 'SET_DATA_PROP';

export const SET_PAYMENT_METHODS = 'SET_PAYMENT_METHODS';
export const SET_RECEIVE_METHODS = 'SET_RECEIVE_METHODS';
export const SET_DELIVERY_TYPES = 'SET_DELIVERY_TYPES';
export const SET_CONFIRMATION_TYPES = 'SET_CONFIRMATION_TYPES';

export const SET_ADDRESSES = 'SET_ADDRESSES';
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';

export const SET_PICKUP_POINTS = 'SET_PICKUP_POINTS';
export const SET_SELECTED_PICKUP_POINT = 'SET_SELECTED_PICKUP_POINT';

export const SET_RECEIVE_METHOD = 'SET_RECEIVE_METHOD';
export const SET_SELECTED_PACKAGE = 'SET_SELECTED_PACKAGE';
export const SET_PACKAGES = 'SET_PACKAGES';

export const SET_PACKAGE_DATE = 'SET_PACKAGE_DATE';

export const ADD_ADDRESS = 'ADD_ADDRESS';

export default {
    [SET_DATA_PROP](state, { prop, value }) {
        state.checkoutData[prop] = value;
    },

    [SET_TYPE](state, payload = null) {
        state.checkoutType = payload;
    },

    [SET_DATA](state, payload = {}) {
        state.checkoutData = payload;
    },

    [SET_PAYMENT_METHODS](state, payload = []) {
        state.paymentMethods = payload;
    },

    [SET_RECEIVE_METHODS](state, payload = []) {
        state.receiveMethods = payload;
    },

    [SET_DELIVERY_TYPES](state, payload = []) {
        state.deliveryTypes = payload;
    },

    [SET_CONFIRMATION_TYPES](state, payload = []) {
        state.confirmationTypes = payload;
    },

    [SET_ADDRESSES](state, payload = []) {
        state.addresses = payload;
    },

    [SET_SELECTED_ADDRESS](state, payload = {}) {
        state.selectedAddress = payload;
    },

    [SET_SELECTED_PICKUP_POINT](state, payload = {}) {
        state.selectedPickupPoint = payload;
    },

    [SET_PICKUP_POINTS](state, payload = []) {
        state.pickupPoints = payload;
    },

    [SET_RECEIVE_METHOD](state, payload = {}) {
        state.selectedReceiveMethod = payload;
    },

    [SET_SELECTED_PACKAGE](state, payload = {}) {
        state.selectedPackage = payload;
    },

    [SET_PACKAGES](state, payload = {}) {
        state.packages = payload;
    },

    [SET_PACKAGE_DATE](state, { id, selectedDate }) {
        const chunkItem = state.selectedPackage.items.find(i => i.id === id);
        if (!chunkItem) return;
        chunkItem.selectedDate = selectedDate;
    },

    [ADD_ADDRESS](state, payload) {
        state.addresses.push(payload);
    },
};
