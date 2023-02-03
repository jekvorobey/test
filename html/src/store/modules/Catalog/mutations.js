import { PREVIOUS_CATALOG_FETCH_PAYLOAD, ITEMS_REFERRER_PROMO } from './index';

export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const APPLY_DATA = 'APPLY_DATA';
export const SET_PREVIOUS_CATALOG_FETCH_PAYLOAD = 'SET_PREVIOUS_CATALOG_FETCH_PAYLOAD';
export const SET_ITEMS_REFERRER_PROMO = 'SET_ITEMS_REFERRER_PROMO';
const CHANGE_FILTER_STATE = 'CHANGE_FILTER_STATE';

export default {
    [SET_LOAD_PATH](state, payload = '') {
        state.loadPath = payload;
    },

    [APPLY_DATA](state, data) {
        Object.assign(state, data);
    },

    [CHANGE_FILTER_STATE](state, { name, value }) {
        state.filtersStateMap = {
            ...state.filtersStateMap,
            [name]: value,
        };
    },

    [SET_PREVIOUS_CATALOG_FETCH_PAYLOAD](state, payload) {
        state[PREVIOUS_CATALOG_FETCH_PAYLOAD] = payload;
    },

    [SET_ITEMS_REFERRER_PROMO](state, payload) {
        state[ITEMS_REFERRER_PROMO] = payload;
    }
};
