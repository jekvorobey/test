import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'addresses';
export const LOAD = 'load';

export const REFERRAL_DATA = 'referralData';

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
