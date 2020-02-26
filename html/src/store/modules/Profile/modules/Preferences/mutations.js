export const SET_PREFERENCES_DATA = 'SET_PREFERENCES_DATA';
export const SET_LOAD = 'SET_LOAD';

export const SET_ENTITIES = 'SET_ENTITIES';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_PREFERENCES_DATA](state, payload = {}) {
        state.customer = payload.customer;
        state.availableBrands = payload.brands;
        state.availableCategories = payload.categories;
    },

    [SET_ENTITIES](state, { type, items }) {
        state.customer[type] = items;
    },
};
