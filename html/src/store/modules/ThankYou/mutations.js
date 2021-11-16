export const SET_ORDERS = 'SET_COMPLETED_ORDERS';

export default {
    [SET_ORDERS](state, payload) {
        state.completedOrders = payload;
    },
};
