import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'checkout';
export const CHECKOUT_DATA = 'checkoutData';
export const CHECKOUT_TYPE = 'checkoutType';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [CHECKOUT_DATA]: {},
        [CHECKOUT_TYPE]: null,
    },
    actions,
    mutations,
    getters,
};
