export const SET_STEP = 'setStep';
export const SET_SELECTED_PRODUCTS = 'setSelectedProducts';

export default {
    [SET_STEP]({ commit }, payload) {
        commit(SET_STEP, payload);
    },

    [SET_SELECTED_PRODUCTS]({ commit }, payload) {
        commit(SET_SELECTED_PRODUCTS, payload);
    },
};
