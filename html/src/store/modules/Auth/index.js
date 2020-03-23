import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'auth';
export const HAS_SESSION = 'hasSession';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [HAS_SESSION]: false,
        },
        actions,
        mutations,
        getters,
    };
}
