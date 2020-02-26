import { storeErrorHandler } from '../../../../../util/store';
import { getProfilePreferences, changeProfilePreferences } from '../../../../../api';
import { SET_PREFERENCES_DATA, SET_ENTITIES } from './mutations';

export const FETCH_PREFERENCES_DATA = 'FETCH_PREFERENCES_DATA';
export const SET_LOAD = 'SET_LOAD';

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    async [UPDATE_ENTITIES]({ commit }, { type, items = [] }) {
        try {
            await changeProfilePreferences(type, items);
            commit(SET_ENTITIES, { type, items });
        } catch (error) {
            storeErrorHandler(UPDATE_ENTITIES)(error);
        }
    },

    async [FETCH_PREFERENCES_DATA]({ commit }, isServer) {
        try {
            const data = await getProfilePreferences();
            commit(SET_PREFERENCES_DATA, data);
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(SET_PREFERENCES_DATA, true)(error);
        }
    },
};
