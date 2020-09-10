import { storeErrorHandler } from '@util/store';
import { getSubscribes, getSubscribesContent, updateSubscribes } from '@api';

import { SET_SUBSCRIBES, SET_CONTENT } from './mutations';

export const SET_LOAD = 'SET_LOAD';

export const FETCH_SUBSCRIBES_DATA = 'FETCH_SUBSCRIBES_DATA';
export const FETCH_SUBSCRIBES = 'FETCH_SUBSCRIBES';
export const FETCH_CONTENT = 'FETCH_CONTENT';

export const UPDATE_SUBSCRIBES = 'UPDATE_SUBSCRIBES';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    async [UPDATE_SUBSCRIBES]({ dispatch }, payload) {
        try {
            await updateSubscribes(payload);
            await dispatch(FETCH_SUBSCRIBES);
        } catch (error) {
            storeErrorHandler(UPDATE_SUBSCRIBES, true)(error);
        }
    },

    async [FETCH_CONTENT]({ commit }) {
        try {
            const data = await getSubscribesContent();
            commit(SET_CONTENT, data);
        } catch (error) {
            storeErrorHandler(FETCH_CONTENT)(error);
        }
    },

    async [FETCH_SUBSCRIBES]({ commit }) {
        try {
            const data = await getSubscribes();
            commit(SET_SUBSCRIBES, data);
        } catch (error) {
            storeErrorHandler(FETCH_SUBSCRIBES, true)(error);
        }
    },

    async [FETCH_SUBSCRIBES_DATA]({ commit, dispatch }, isServer) {
        try {
            await Promise.all([dispatch(FETCH_CONTENT), dispatch(FETCH_SUBSCRIBES)]);
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_SUBSCRIBES_DATA, true)(error);
        }
    },
};
