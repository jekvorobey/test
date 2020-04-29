export const SET_PREFERENCES_DATA = 'SET_PREFERENCES_DATA';
export const SET_LOAD = 'SET_LOAD';
export const SET_TYPE = 'SET_TYPE';

export const SET_ENTITIES = 'SET_ENTITIES';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_TYPE](state, payload) {
        state.type = payload;
    },

    [SET_PREFERENCES_DATA](state, payload = {}) {
        const { preferenceType = null, data = {} } = payload;
        if (preferenceType) {
            state.preferencesData[preferenceType].customer = data.customer || {};
            state.availableBrands = data.brands || [];
            state.availableCategories = data.categories || [];
        }
    },

    [SET_ENTITIES](state, { preferencesType, type, items }) {
        state.preferencesData[preferencesType].customer[type] = items;
    },
};
