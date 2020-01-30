import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'brand';
export const ITEMS = 'items';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [ITEMS]: [],
    },
    actions,
    mutations,
    getters,
};
