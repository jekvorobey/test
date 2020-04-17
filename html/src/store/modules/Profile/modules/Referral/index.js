import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'referral';
export const LOAD = 'load';

const REFERRAL_DATA = 'levelData';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,
            [REFERRAL_DATA]: {},
        },

        actions,
        mutations,
        getters,
    };
}
