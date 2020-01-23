export const SET_PROMO_DATA = 'SET_PROMO_DATA';

export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB';
export const UPDATE_PORTFOLIOS = 'UPDATE_PORTFOLIOS';
export const UPDATE_PROFILES = 'UPDATE_PROFILES';

export default {
    [SET_PROMO_DATA](state, payload) {
        state.promoData = payload;
    },

    [UPDATE_BREADCRUMB](state, payload = []) {
        state.breadcrumbs = payload;
    },

    [UPDATE_PORTFOLIOS](state, payload = []) {
        state.cabinetData.portfolios = payload;
    },

    [UPDATE_PROFILES](state, payload = []) {
        state.cabinetData.profiles = payload;
    },
};
