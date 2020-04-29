import { preferenceType } from '@enums/profile';
import { storeErrorHandler } from '@util/store';
import { getProfilePreferences, changeProfilePreferences } from '@api';
import { SET_PREFERENCES_DATA, SET_ENTITIES } from './mutations';

export const FETCH_PREFERENCES_DATA = 'FETCH_PREFERENCES_DATA';
export const FETCH_PREFERENCES = 'FETCH_PREFERENCES';
export const SET_LOAD = 'SET_LOAD';
export const SET_TYPE = 'SET_TYPE';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    [SET_TYPE]({ commit }, payload) {
        commit(SET_TYPE, payload);
    },

    async [UPDATE_ENTITIES]({ commit }, { preferenceType, type, items = [] }) {
        try {
            await changeProfilePreferences(preferenceType, type, items);
            commit(SET_ENTITIES, { preferenceType, type, items });
        } catch (error) {
            storeErrorHandler(UPDATE_ENTITIES)(error);
        }
    },

    async [FETCH_PREFERENCES]({ commit }, prefType) {
        try {
            const data = await getProfilePreferences(prefType);
            commit(SET_PREFERENCES, { preferenceType: prefType, data });
        } catch (error) {
            storeErrorHandler(FETCH_PREFERENCES)(error);
        }
    },

    async [FETCH_PREFERENCES_DATA]({ commit, dispatch }, { prefType, isServer }) {
        try {
            switch (prefType) {
                case preferenceType.PERSONAL:
                    await dispatch(FETCH_PREFERENCES, preferenceType.PERSONAL);
                    break;
                case preferenceType.PROFESSIONAL:
                    Promise.all([
                        dispatch(FETCH_PREFERENCES, preferenceType.PERSONAL),
                        dispatch(FETCH_PREFERENCES, preferenceType.PROFESSIONAL),
                    ]);
                    break;
            }
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_PREFERENCES_DATA, true)(error);
        }
    },
};
