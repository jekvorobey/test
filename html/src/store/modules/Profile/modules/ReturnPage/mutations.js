export const SET_STEP = 'setStep';
export const SET_SELECTED_PRODUCTS = 'setSelectedProducts';
export const SET_REASON = 'setReason';

export default {
    [SET_STEP](state, payload = null) {
        state.step = payload;
    },

    [SET_SELECTED_PRODUCTS](state, payload = null) {
        state.selectedProducts = payload;
    },

    [SET_REASON](state, {productId, reasonText }) {
        const product = state.selectedProducts.find((item) => item.id === productId);
        product.reason = reasonText;
    }
};
