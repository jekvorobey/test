export const SET_LOAD_PATH = 'SET_LOAD_PATH';

export const SET_PROMOCODES_DATA = 'SET_PROMOCODES_DATA';
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [SET_PROMOCODES_DATA](state, payload = {}) {
        const { promo_codes, categories, brands, offers } = payload;

        state.items = promo_codes || [];
        state.categories = categories || {};
        state.brands = brands || {};
        state.offers = offers || {};
    },
};
