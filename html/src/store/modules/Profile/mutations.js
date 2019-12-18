export const SET_PROMO_DATA = 'SET_PROMO_DATA';

export default {
    [SET_PROMO_DATA](state, payload) {
        state.promoData = payload;
    },
};
