import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'modal';
export const MODALS = 'modals';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [MODALS]: {},
        },
        actions,
        mutations,
        getters,
    };
}
