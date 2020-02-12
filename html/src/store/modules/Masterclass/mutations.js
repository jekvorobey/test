export const SET_MASTERCLASS = 'SET_MASTERCLASS';
export const SET_FEATURED = 'SET_FEATURED';
export const SET_INSTAGRAM_ITEMS = 'SET_INSTAGRAM_ITEMS';

export default {
    [SET_MASTERCLASS](state, payload = {}) {
        state.masterClassCode = payload.code;
        state.masterClass = payload;
    },

    [SET_FEATURED](state, payload = []) {
        state.featured = payload;
    },

    [SET_INSTAGRAM_ITEMS](state, payload = []) {
        state.instagramItems = payload;
    },
};
