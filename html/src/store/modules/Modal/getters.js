export const MODAL_SHOW_COUNT = 'MODAL_SHOW_COUNT';

export default {
    [MODAL_SHOW_COUNT]: (state) => (name) => {
        if (typeof state.modalsShowCount[name] !== 'undefined') {
            return state.modalsShowCount[name];
        }

        return 0;
    },
};
