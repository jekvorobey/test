import { preferenceType } from '@enums/profile';
import { storeErrorHandler } from '@util/store';
import { getProfilePreferences, changeProfilePreferences } from '@api';
import { SET_PREFERENCES_DATA, SET_ENTITIES, SET_SAME_SELECT } from './mutations';

export const FETCH_PREFERENCES_DATA = 'FETCH_PREFERENCES_DATA';
export const FETCH_PREFERENCES = 'FETCH_PREFERENCES';
export const FETCH_SAME_SELECT = 'FETCH_SAME_SELECT';
export const SET_LOAD = 'SET_LOAD';
export const SET_TYPE = 'SET_TYPE';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';
export const UPDATE_SAME_SELECT = 'UPDATE_SAME_SELECT';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    [SET_TYPE]({ commit }, payload) {
        commit(SET_TYPE, payload);
    },

    async [UPDATE_ENTITIES]({ commit }, { prefType, type, items = [] }) {
        try {
            await changeProfilePreferences(prefType, type, items);
            commit(SET_ENTITIES, { prefType, type, items });
        } catch (error) {
            storeErrorHandler(UPDATE_ENTITIES)(error);
        }
    },

    async [FETCH_PREFERENCES]({ commit }, prefType) {
        try {
            const data = await getProfilePreferences(prefType);
            console.log(data);
            commit(SET_PREFERENCES_DATA, { prefType, data });
        } catch (error) {
            storeErrorHandler(FETCH_PREFERENCES)(error);
        }
    },

    async [FETCH_SAME_SELECT]({ commit }) {
        try {
            // const data = await getSameSelect();
            commit(SET_SAME_SELECT, { data });
        } catch (error) {
            storeErrorHandler(FETCH_SAME_SELECT)(error);
        }
    },

    async [UPDATE_SAME_SELECT]({ commit }, { sameBrands, sameCategories }) {
        try {
            // await setSameSelect(sameBrands, sameCategories)
            commit(SET_SAME_SELECT, { sameBrands, sameCategories });
        } catch (error) {
            storeErrorHandler(FETCH_SAME_SELECT)(error);
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
                        // dispatch(FETCH_SAME_SELECT)
                    ]);
                    break;
            }
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_PREFERENCES_DATA, true)(error);
        }
    },
};
