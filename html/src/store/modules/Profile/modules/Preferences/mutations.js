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
        const { prefType = null, data = {} } = payload;
        if (prefType) {
            state.preferencesData[prefType].customer = data.customer || {};
            state.availableBrands = data.brands || [];
            state.availableCategories = data.categories || [];
        }
    },

    [SET_ENTITIES](state, { prefType, type, items }) {
        state.preferencesData[prefType].customer[type] = items;
    },
};
