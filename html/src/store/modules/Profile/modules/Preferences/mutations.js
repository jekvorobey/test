import { preferenceType } from '@enums/profile';

export const SET_PREFERENCES_DATA = 'SET_PREFERENCES_DATA';
export const SET_LOAD = 'SET_LOAD';
export const SET_TYPE = 'SET_TYPE';
export const SET_EQUAL_PREFERENCES = 'SET_EQUAL_PREFERENCES';
export const SET_ALL_PREFERENCES_DATA = 'SET_ALL_PREFERENCES_DATA';

export const SET_ENTITIES = 'SET_ENTITIES';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_TYPE](state, payload) {
        state.type = payload;
    },

    [SET_PREFERENCES_DATA](state, payload = {}) {
        const { prefType, data = {} } = payload;
        state.preferencesData[prefType] = data;
    },

    [SET_ALL_PREFERENCES_DATA](state, payload = {}) {
        state.available = payload;
    },

    [SET_ENTITIES](state, { prefType, type, items }) {
        const data = state.preferencesData[prefType];
        if (data) {
            const { customer } = data;
            customer[type] = items;
        }
    },

    [SET_EQUAL_PREFERENCES](state, payload) {
        const data = state.preferencesData[preferenceType.PROFESSIONAL];
        if (data) {
            const { customer } = data;
            customer.equal_preferences = payload || [];
        }
    },
};
