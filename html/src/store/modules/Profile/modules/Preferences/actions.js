import { preferenceType } from '@enums/profile';
import { storeErrorHandler } from '@util/store';
import {
    getProfilePreferences,
    changeProfilePreferences,
    getAllPreferences,
    changeProfileEqualPreferences,
} from '@api';
import { SET_PREFERENCES_DATA, SET_ENTITIES, SET_EQUAL_PREFERENCES, SET_ALL_PREFERENCES_DATA } from './mutations';

export const FETCH_PREFERENCES_DATA = 'FETCH_PREFERENCES_DATA';
export const FETCH_ALL_PREFERENCES_DATA = 'FETCH_ALL_PREFERENCES_DATA';
export const FETCH_PREFERENCES = 'FETCH_PREFERENCES';
export const SET_LOAD = 'SET_LOAD';
export const SET_TYPE = 'SET_TYPE';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const UPDATE_EQUAL_PREFERENCES = 'UPDATE_EQUAL_PREFERENCES';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    [SET_TYPE]({ commit }, payload) {
        commit(SET_TYPE, payload);
    },

    async [UPDATE_ENTITIES]({ dispatch, commit }, { prefType, type, items = [], equals = null }) {
        try {
            await changeProfilePreferences(prefType, type, items);
            if (equals) await dispatch(UPDATE_EQUAL_PREFERENCES, equals);
            else commit(SET_ENTITIES, { prefType, type, items });
        } catch (error) {
            storeErrorHandler(UPDATE_ENTITIES)(error);
        }
    },

    async [FETCH_PREFERENCES]({ commit }, prefType) {
        try {
            const data = await getProfilePreferences(prefType);
            commit(SET_PREFERENCES_DATA, { prefType, data });
        } catch (error) {
            storeErrorHandler(FETCH_PREFERENCES)(error);
        }
    },

    async [FETCH_ALL_PREFERENCES_DATA]({ commit }) {
        try {
            const data = await getAllPreferences();
            commit(SET_ALL_PREFERENCES_DATA, data);
        } catch (error) {
            storeErrorHandler(FETCH_ALL_PREFERENCES_DATA)(error);
        }
    },

    async [UPDATE_EQUAL_PREFERENCES]({ dispatch }, payload) {
        try {
            await changeProfileEqualPreferences(payload || []);
            await dispatch(FETCH_PREFERENCES, preferenceType.PROFESSIONAL);
        } catch (error) {
            storeErrorHandler(UPDATE_EQUAL_PREFERENCES)(error);
        }
    },

    async [FETCH_PREFERENCES_DATA]({ commit, dispatch }, { prefType, isServer }) {
        try {
            switch (prefType) {
                case preferenceType.PROFESSIONAL:
                    Promise.all([
                        dispatch(FETCH_PREFERENCES, preferenceType.PERSONAL),
                        dispatch(FETCH_PREFERENCES, preferenceType.PROFESSIONAL),
                    ]);
                    break;
                case preferenceType.PERSONAL:
                default:
                    await dispatch(FETCH_PREFERENCES, preferenceType.PERSONAL);
                    break;
            }
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_PREFERENCES_DATA, true)(error);
        }
    },
};
