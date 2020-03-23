import { storeErrorHandler } from '@util/store';
import { getProfileAddresses, changeProfileAddress, defaultProfileAddress, deleteProfileAddress } from '@api';
import { SET_ADDRESSES_DATA } from './mutations';

export const FETCH_ADDRESSES_DATA = 'FETCH_ADDRESSES_DATA';
export const SET_LOAD = 'SET_LOAD';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const SET_DEFAULT_ADDRESS = 'SET_DEFAULT_ADDRESS';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    async [SET_DEFAULT_ADDRESS]({ commit }, id) {
        try {
            await defaultProfileAddress(id);
            commit(SET_DEFAULT_ADDRESS, id);
        } catch (error) {
            storeErrorHandler(SET_DEFAULT_ADDRESS)(error);
        }
    },

    async [DELETE_ADDRESS]({ dispatch, commit, state }, address) {
        try {
            await deleteProfileAddress(address.id);
            commit(DELETE_ADDRESS, address);
            if (address.default && state.addresses.length > 0) dispatch(SET_DEFAULT_ADDRESS, state.addresses[0].id);
        } catch (error) {
            storeErrorHandler(DELETE_ADDRESS)(error);
        }
    },

    async [UPDATE_ADDRESS]({ dispatch, commit, state }, address) {
        try {
            const { id } = await changeProfileAddress(address);
            if (id) address.id = id;
            commit(UPDATE_ADDRESS, address);
            if (state.addresses.length === 1) dispatch(SET_DEFAULT_ADDRESS, id);
        } catch (error) {
            storeErrorHandler(UPDATE_ADDRESS)(error);
        }
    },

    async [FETCH_ADDRESSES_DATA]({ commit }, isServer) {
        try {
            const data = await getProfileAddresses();
            commit(SET_ADDRESSES_DATA, data);
            commit(SET_LOAD, isServer);
        } catch (error) {
            storeErrorHandler(FETCH_ADDRESSES_DATA, true)(error);
        }
    },
};
