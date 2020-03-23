import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'productGroups';

export const LOAD_PATH = 'loadPath';
export const TYPE = 'type';
export const ITEMS = 'items';
export const RANGE = 'range';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [ITEMS]: [],
            [LOAD_PATH]: '',
            [TYPE]: null,
            [RANGE]: 0,
        },
        actions,
        mutations,
        getters,
    };
}
