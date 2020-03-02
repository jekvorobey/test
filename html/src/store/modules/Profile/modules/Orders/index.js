import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'orders';
export const LOAD = 'load';

export const ORDERS = 'orders';
export const ORDER_DETAILS = 'orderDetails';

export default {
    name: NAME,
    namespaced: true,

    state: {
        [LOAD]: false,

        [ORDERS]: [],
        [ORDER_DETAILS]: {},
    },

    actions,
    mutations,
    getters,
};
