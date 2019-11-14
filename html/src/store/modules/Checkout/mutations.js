export const SET_DATA = 'SET_DATA';

export const SET_PAYMENT_METHODS = 'SET_PAYMENT_METHODS';
export const SET_DELIVERY_METHODS = 'SET_DELIVERY_METHODS';
export const SET_DELIVERY_TYPES = 'SET_DELIVERY_TYPES';
export const SET_CONFIRMATION_TYPES = 'SET_CONFIRMATION_TYPES';
export const SET_ADDRESSES = 'SET_ADDRESSES';

export default {
    [SET_DATA](state, payload = {}) {
        state.cartData = payload;
    },

    [SET_PAYMENT_METHODS](state, payload = []) {
        state.paymentMethods = payload;
    },

    [SET_DELIVERY_METHODS](state, payload = []) {
        state.deliveryMethods = payload;
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
};
