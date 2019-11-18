import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'modal';
export const MODALS = 'modals';

export default {
    name: NAME,
    namespaced: true,
    state: {
        modals: {},
    },
    actions,
    mutations,
    getters,
};
