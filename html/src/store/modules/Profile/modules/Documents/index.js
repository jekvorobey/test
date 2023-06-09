import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'documents';

export const LOAD_PATH = 'loadPath';
export const ITEMS = 'items';
export const FILTERS = 'filters';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD_PATH]: '',
            [ITEMS]: [],
            [FILTERS]: {},
        },

        actions,
        mutations,
        getters,
    };
}
