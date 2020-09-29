import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'custom';
export const LOAD_PATH = 'loadPath';
export const PAGE_DATA = 'pageData';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [LOAD_PATH]: '',
            [PAGE_DATA]: {},
        },
        actions,
        mutations,
        getters,
    };
}
