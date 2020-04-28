import { sortDirections } from '@enums';
import { sortFields } from '@enums/favorites';
import { DEFAULT_PAGE } from '@constants';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const REFERRER_ID = 'referrerId';

export const NAME = 'referrer';
export const LOAD_PATH = 'loadPath';

export const TITLE = 'title';
export const ITEMS = 'items';
export const ACTIVE_PAGE = 'activePage';
export const RANGE = 'range';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [LOAD_PATH]: '',

            [TITLE]: '',
            [REFERRER_ID]: null,
            [ITEMS]: [],
            [RANGE]: 0,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },
        actions,
        mutations,
        getters,
    };
}
