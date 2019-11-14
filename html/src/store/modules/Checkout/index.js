import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'checkout';
export const CHECKOUT_DATA = 'checkoutData';
export const CHECKOUT_TYPE = 'checkoutType';
export const PAYMENT_METHODS = 'paymentMethods';
export const DELIVERY_METHODS = 'deliveryMethods';
export const DELIVERY_TYPES = 'deliveryTypes';
export const CONFIRMATION_TYPES = 'confirmationTypes';
export const ADDRESSES = 'addresses';
export const PACKAGES = 'packages';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [CHECKOUT_DATA]: {},
        [CHECKOUT_TYPE]: null,
        [PAYMENT_METHODS]: [],
        [DELIVERY_METHODS]: [],
        [DELIVERY_TYPES]: [],
        [CONFIRMATION_TYPES]: [],
        [ADDRESSES]: [],
        [PACKAGES]: {},
    },
    actions,
    mutations,
    getters,
};
