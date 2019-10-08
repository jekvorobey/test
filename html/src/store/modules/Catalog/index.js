import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    name: 'catalog',
    namespaced: true,
    state: {
        load: false,
        items: [],
    },
    actions,
    mutations,
    getters,
};
