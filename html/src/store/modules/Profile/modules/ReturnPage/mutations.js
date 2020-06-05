export const SET_STEP = 'setStep';
export const SET_SELECTED_PRODUCTS = 'setSelectedProducts';

export default {
    [SET_STEP](state, payload = null) {
        state.step = payload;
    },

    [SET_SELECTED_PRODUCTS](state, payload = null) {
        state.selectedProducts = payload;
    }
};
