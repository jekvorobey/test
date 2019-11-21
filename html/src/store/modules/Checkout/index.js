import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'checkout';
export const CHECKOUT_DATA = 'checkoutData';
export const CHECKOUT_TYPE = 'checkoutType';
export const PAYMENT_METHODS = 'paymentMethods';
export const RECEIVE_METHODS = 'receiveMethods';
export const DELIVERY_TYPES = 'deliveryTypes';
export const CONFIRMATION_TYPES = 'confirmationTypes';

export const ADDRESSES = 'addresses';
export const SELECTED_ADDRESS = 'selectedAddress';

export const PICKUP_POINTS = 'pickupPoints';
export const SELECTED_PICKUP_POINT = 'selectedPickupPoint';

export const SELECTED_DELIVERY_TYPE = 'selectedDeliveryType';
export const SELECTED_RECEIVE_METHOD = 'selectedReceiveMethod';

export const PACKAGES = 'packages';
export const SELECTED_PACKAGE = 'selectedPackage';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [CHECKOUT_DATA]: {},
        [CHECKOUT_TYPE]: null,
        [PAYMENT_METHODS]: [],
        [RECEIVE_METHODS]: [],
        [DELIVERY_TYPES]: [],
        [CONFIRMATION_TYPES]: [],

        [ADDRESSES]: [],
        [PACKAGES]: [],

        [SELECTED_RECEIVE_METHOD]: null,
        [SELECTED_DELIVERY_TYPE]: null,
        [SELECTED_ADDRESS]: null,
        [SELECTED_PICKUP_POINT]: null,
        [SELECTED_PACKAGE]: null,
    },
    actions,
    mutations,
    getters,
};
