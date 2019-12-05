export const MUTATE_SELECTED_CITY = 'MUTATE_SELECTED_CITY';

export default {
    [MUTATE_SELECTED_CITY](state, payload) {
        state.selectedCity = payload;
    },
};
