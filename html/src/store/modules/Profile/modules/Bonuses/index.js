import { DEFAULT_PAGE } from '@constants';
import { sortDirections } from '@enums';
import { referralOrderSortFields } from '@enums/profile';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'bonuses';
export const LOAD_PATH = 'loadPath';

export const INFO = 'info';
export const BONUSES = 'bonuses';
export const RANGE = 'range';
export const ITEMS = 'items';
export const ACTIVE_PAGE = 'activePage';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD_PATH]: '',

            [INFO]: null,
            [BONUSES]: null,

            [ITEMS]: [],
            [RANGE]: 0,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },

        actions,
        mutations,
        getters,
    };
}
