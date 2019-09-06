export default {
    SET_SEARCH_SUGGESTION(state, payload) {
        state.suggestions = payload;
    },

    SET_SEARCH(state, payload) {
        state.search = payload;
    },
};
