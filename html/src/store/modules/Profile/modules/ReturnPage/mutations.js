export const SET_STEP = 'setStep';

export default {
    [SET_STEP](state, payload = null) {
        state.step = payload;
    },
};
