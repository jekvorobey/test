export const SET_ADDRESSES_DATA = 'SET_ADDRESSES_DATA';
export const SET_LOAD = 'SET_LOAD';

export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [UPDATE_ADDRESS](state, payload) {
        const address = state.addresses.find(a => a.id === payload.id);
        if (address) {
            const index = state.addresses.indexOf(address);
            state.addresses.splice(index, 1, payload);
        } else {
            state.addresses.push(payload);
        }
    },

    [SET_ADDRESSES_DATA](state, payload = {}) {
        state.addresses = payload.addresses;
    },
};
