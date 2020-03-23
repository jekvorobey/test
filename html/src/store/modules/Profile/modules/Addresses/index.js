import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'addresses';
export const LOAD = 'load';

export const ADDRESSES = 'addresses';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,
            [ADDRESSES]: [],
        },

        actions,
        mutations,
        getters,
    };
}
