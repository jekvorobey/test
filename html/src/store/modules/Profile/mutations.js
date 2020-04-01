export const SET_PROMO_DATA = 'SET_PROMO_DATA';

export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB';
export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
export const UPDATE_PROFILES = 'UPDATE_PROFILES';
export const UPDATE_REQUISITES = 'UPDATE_REQUISITES';
export const SET_PROMOPAGE_TITLE = 'SET_PROMOPAGE_TITLE';
export const UPDATE_CREDENTIAL = 'UPDATE_CREDENTIAL';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const DELETE_ENTITY = 'DELETE_ENTITY';
export const DELETE_ALL_ENTITIES = 'DELETE_ALL_ENTITIES';

export default {
    [UPDATE_BREADCRUMB](state, payload = []) {
        state.breadcrumbs = payload;
    },

    [SET_PROMO_DATA](state, payload) {
        state.promoData = payload;
    },

    [SET_PROMOPAGE_TITLE](state, payload = []) {
        state.title = payload;
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
