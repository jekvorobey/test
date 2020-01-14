export const SET_PROMO_DATA = 'SET_PROMO_DATA';

export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB';

export default {
    [SET_PROMO_DATA](state, payload) {
        state.promoData = payload;
    },

    [UPDATE_BREADCRUMB](state, payload = []) {
        state.breadcrumbs = payload;
    },
};
