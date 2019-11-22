import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'auth';

export default {
    name: NAME,
    namespaced: true,
    state: {},
    actions,
    mutations,
    getters,
};
