import { storeErrorHandler } from '../../../../../util/store';
import { getProfileAddresses, changeProfileAddress } from '../../../../../api';
import { SET_ADDRESSES_DATA } from './mutations';

export const FETCH_ADDRESSES_DATA = 'FETCH_ADDRESSES_DATA';
export const SET_LOAD = 'SET_LOAD';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export default {
    [SET_LOAD]({ commit }, payload) {
        commit(SET_LOAD, payload);
    },

    async [UPDATE_ADDRESS]({ commit }, address) {
        try {
            const { id } = await changeProfileAddress(address);
            if (id) address.id = id;
            commit(UPDATE_ADDRESS, address);
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
