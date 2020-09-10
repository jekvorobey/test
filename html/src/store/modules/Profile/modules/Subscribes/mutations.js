export const SET_LOAD = 'SET_LOAD';

export const SET_CONTENT = 'SET_CONTENT';
export const SET_SUBSCRIBES = 'SET_SUBSCRIBES';

export default {
    [SET_LOAD](state, payload = false) {
        state.load = payload;
    },

    [SET_SUBSCRIBES](state, payload) {
        state.subscribes = payload || {};
    },

    [SET_CONTENT](state, payload) {
        state.content = payload || {};
    },
};
