import { SET_ORDERS } from './mutations';

export const SET_COMPLETED_ORDERS = 'SET_COMPLETED_ORDERS';
export const GET_COMPLETED_ORDERS = 'GET_COMPLETED_ORDERS';

function getOrdersFromLocalStorage() {
    const localStorageData = window && window.localStorage && window.localStorage.getItem('ThankYouViewCompletedOrders');
    const parsedData = localStorageData ? JSON.parse(localStorageData) : [];
    return Array.isArray(parsedData) ? parsedData : [];
}

export default {
    [SET_COMPLETED_ORDERS]({ commit }, payload) {
        const completedOrders = getOrdersFromLocalStorage();
        completedOrders.push(payload);
        commit(SET_ORDERS, completedOrders);
        window.localStorage.setItem('ThankYouViewCompletedOrders', JSON.stringify(completedOrders));
    },

    [GET_COMPLETED_ORDERS]({ commit }) {
        const completedOrders = getOrdersFromLocalStorage();
        commit(SET_ORDERS, completedOrders);
    },
};
