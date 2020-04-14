import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { sortDirections } from '@enums';
import { sortFields } from '@enums/favorites';
import { DEFAULT_PAGE } from '@constants';

export const NAME = 'favorites';
export const LOAD_PATH = 'loadPath';

export const FAVORITES = 'favorites';
export const FAVORITES_ALL = 'favoritesAll';

export const FAVORITES_DIRECTION = 'orderDirection';
export const FAVORITES_FIELD = 'orderField';
export const ACTIVE_PAGE = 'activePage';
export const RANGE = 'range';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [LOAD_PATH]: '',

            [FAVORITES]: [],
            [FAVORITES_ALL]: [],
            [RANGE]: 0,

            [FAVORITES_DIRECTION]: sortDirections.DESC,
            [FAVORITES_FIELD]: sortFields.ID,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },
        actions,
        mutations,
        getters,
    };
}
