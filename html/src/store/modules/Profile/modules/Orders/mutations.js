export const SET_LOAD = 'SET_LOAD';

export const SET_ORDERS = 'SET_ORDERS';
export const SET_ORDERS_MORE = 'SET_ORDERS_MORE';
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';

export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_QUERY_PARAMS](state, { page = 1, orderField, orderDirection }) {
        state.activePage = Number(page);
        state.orderField = orderField;
        state.orderDirection = orderDirection;
    },

    [SET_ORDERS_MORE](state, { items, range }) {
        state.orders.push(...items);
        state.range = range || 0;
    },

    [SET_ORDERS](state, { items, range }) {
        state.orders = items;
        state.range = range || 0;
    },

    [SET_ORDER_DETAILS](state, payload) {
        state.orderDetails = payload;
    },
};
