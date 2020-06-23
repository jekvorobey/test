import Vue from 'vue';

export const SET_REFERRAL_DATA = 'SET_REFERRAL_DATA';
export const SET_ORDERS = 'SET_ORDERS';
export const SET_ORDERS_MORE = 'SET_ORDERS_MORE';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const SET_REFERRAL_ORDER_DETAILS = 'SET_REFERRAL_ORDER_DETAILS';
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export default {
    [SET_LOAD_PATH](state, payload) {
        state.loadPath = payload;
    },

    [SET_QUERY_PARAMS](state, { page = 1, orderField, orderDirection, orderFilterField }) {
        state.activePage = Number(page);
        state.orderField = orderField;
        state.orderDirection = orderDirection;
        state.orderFilterField = orderFilterField;
    },

    [SET_REFERRAL_ORDER_DETAILS](state, payload = {}) {
        state.referralOrderDetails = payload;
    },

    [SET_ORDERS](state, payload = {}) {
        state.items = payload.items || [];
        state.range = payload.range || 0;
    },

    [SET_ORDERS_MORE](state, { items, range }) {
        state.items.push(...items);
        state.range = range || 0;
    },

    [SET_REFERRAL_DATA](state, payload) {
        state.referralData = payload;
    },
};
