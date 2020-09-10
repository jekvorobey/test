import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'subscribes';

export const LOAD = 'load';
export const CONTENT = 'content';
export const SUBSCRIBES = 'subscribes';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,
            [SUBSCRIBES]: {},
            [CONTENT]: {},
        },

        actions,
        mutations,
        getters,
    };
}
