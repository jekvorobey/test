export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const SET_BILLING_DATA = 'SET_BILLING_DATA';
export const SET_OPERATIONS = 'SET_OPERATIONS';
export const SET_OPERATIONS_MORE = 'SET_OPERATIONS_MORE';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const SET_CARD_CREATION_STATUS = 'SET_CARD_CREATION_STATUS';

export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_QUERY_PARAMS](state, { page = 1, orderField, orderDirection }) {
        state.activePage = Number(page);
        state.orderField = orderField;
        state.orderDirection = orderDirection;
    },

    [SET_OPERATIONS_MORE](state, { items, range }) {
        state.items.push(...items);
        state.range = range || 0;
    },

    [SET_OPERATIONS](state, { items, range }) {
        state.items = items;
        state.range = range || 0;
    },

    [SET_BILLING_DATA](state, payload = {}) {
        state.billingData = payload;
    },

    [SET_SELECTED_CARD](state, payload = null) {
        state.selectedCard = payload;
    },

    [SET_CARD_CREATION_STATUS](state, payload = null) {
        state.cartCreationStatus = payload;
    },
};
