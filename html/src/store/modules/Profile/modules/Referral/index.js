import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const REFERRAL_DATA = 'referralData';

export const NAME = 'referral';
export const LOAD = 'load';
export const ITEMS = 'items';
export const RANGE = 'range';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,
            [REFERRAL_DATA]: {},
            [ITEMS]: [],
            [RANGE]: 0,
        },

        actions,
        mutations,
        getters,
    };
}
