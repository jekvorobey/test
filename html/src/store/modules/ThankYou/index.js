import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'thankYou';
export const COMPLETED_ORDERS = 'completedOrders';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [COMPLETED_ORDERS]: [],
        },
        actions,
        mutations,
        getters,
    };
}
