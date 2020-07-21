export const SET_REVIEWS_DATA = 'SET_REVIEWS_DATA';
export const SET_REVIEWS_MORE = 'SET_REVIEWS_MORE';

export default {
    [SET_REVIEWS_DATA](state, payload = {}) {
        state.range = payload.range || 0;
        state.rating = payload.rating || 0;
        state.activePage = payload.page || 0;
        state.reviews = payload.items || [];
    },

    [SET_REVIEWS_MORE](state, payload = {}) {
        state.activePage = payload.page || 0;
        state.reviews.push(...(payload.items || []));
    },
};
