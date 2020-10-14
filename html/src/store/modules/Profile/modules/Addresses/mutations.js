import Vue from 'vue';

export const SET_ADDRESSES_DATA = 'SET_ADDRESSES_DATA';
export const SET_LOAD = 'SET_LOAD';

export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const SET_DEFAULT_ADDRESS = 'SET_DEFAULT_ADDRESS';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_DEFAULT_ADDRESS](state, id) {
        for (let i = 0; i < state.addresses.length; i++) {
            const address = state.addresses[i];
            Vue.set(address, 'default', address.id === id);
        }
    },

    [UPDATE_ADDRESS](state, payload) {
        const address = state.addresses.find((a) => a.id === payload.id);
        if (address) {
            const index = state.addresses.indexOf(address);
            state.addresses.splice(index, 1, payload);
        } else {
            state.addresses.push(payload);
        }
    },

    [DELETE_ADDRESS](state, address) {
        const index = state.addresses.indexOf(address);
        if (index !== -1) state.addresses.splice(index, 1);
    },

    [SET_ADDRESSES_DATA](state, payload = {}) {
        state.addresses = payload.addresses;
    },
};
