import { DEFAULT_PAGE } from '@constants';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'promopage';

export const LOAD_PATH = 'loadPath';
export const TITLE = 'title';
export const SEARCH_ITEMS = 'searchItems';

export const ITEMS_IDS = 'itemsIds';
export const ITEMS = 'items';
export const RANGE = 'range';
export const ACTIVE_PAGE = 'activePage';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD_PATH]: '',
            [TITLE]: '',

            [ITEMS]: [],
            [RANGE]: 0,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
            [ITEMS_IDS]: [],

            [SEARCH_ITEMS]: [],
        },

        actions,
        mutations,
        getters,
    };
}
