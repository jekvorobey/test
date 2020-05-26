import Vue from 'vue';

export const SET_BONUSES_DATA = 'SET_REFERRAL_DATA';
export const SET_QUERY_PARAMS = 'SET_QUERY_PARAMS';
export const SET_LOAD_PATH = 'SET_LOAD_PATH';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ITEMS_MORE = 'SET_ITEMS_MORE';

export default {
    [SET_LOAD_PATH](state, payload) {
        state.loadPath = payload;
    },

    [SET_QUERY_PARAMS](state, { page = 1 }) {
        state.activePage = Number(page);
    },

    [SET_ITEMS](state, payload = {}) {
        state.items = payload.items || [];
        state.range = payload.range || 0;
    },

    [SET_ITEMS_MORE](state, payload = {}) {
        state.items.push(...payload.items);
        state.range = payload.range || 0;
    },

    [SET_BONUSES_DATA](state, payload = {}) {
        const { info, bonuses } = payload;

        state.info = info || {};
        state.bonuses = bonuses || {};
    },
};
