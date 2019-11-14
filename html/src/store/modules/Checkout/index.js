import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'checkout';
export const DATA = 'data';
export const PAYMENT_METHODS = 'paymentMethods';
export const DELIVERY_METHODS = 'deliveryMethods';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [DATA]: {},
        [PAYMENT_METHODS]: [],
        [DELIVERY_METHODS]: [],
    },
    actions,
    mutations,
    getters,
};
