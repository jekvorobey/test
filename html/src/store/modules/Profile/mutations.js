export const SET_PROMO_DATA = 'SET_PROMO_DATA';

export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB';
export const UPDATE_PORTFOLIOS = 'UPDATE_PORTFOLIOS';
export const UPDATE_PROFILES = 'UPDATE_PROFILES';
export const UPDATE_REQUISITES = 'UPDATE_REQUISITES';
export const UPDATE_PROMOPAGE_NAME = 'UPDATE_PROMOPAGE_NAME';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const DELETE_ENTITY = 'DELETE_ENTITY';
export const DELETE_ALL_ENTITIES = 'DELETE_ALL_ENTITIES';

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

    [UPDATE_REQUISITES](state, payload = {}) {
        state.cabinetData.requisites = payload;
    },

    [UPDATE_PROFILES](state, payload = []) {
        state.cabinetData.profiles = payload;
    },

    [UPDATE_PROMOPAGE_NAME](state, payload = []) {
        state.promoData.name = payload;
    },

    [UPDATE_ENTITIES](state, payload) {
        if (payload && payload.type && payload.data) state[payload.data][payload.type] = payload.items;
    },

    [DELETE_ENTITY](state, payload) {
        if (payload && payload.type && payload.data) state[payload.data][payload.type].splice(payload.index, 1);
    },

    [DELETE_ALL_ENTITIES](state, payload) {
        if (payload && payload.type && payload.data) state[payload.data][payload.type] = [];
    },
};
