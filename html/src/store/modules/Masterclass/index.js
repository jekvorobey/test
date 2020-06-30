import { DEFAULT_PAGE } from '@constants';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'masterclass';
export const MASTERCLASS = 'masterClass';
export const MASTERCLASS_CODE = 'masterClassCode';

export const FEATURED_MASTERCLASSES = 'featuredMasterClasses';
export const INSTAGRAM_ITEMS = 'instagramItems';

export const ITEMS = 'items';
export const RANGE = 'range';
export const ACTIVE_PAGE = 'activePage';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [MASTERCLASS_CODE]: '',
            [MASTERCLASS]: {},
            [FEATURED_MASTERCLASSES]: { items: [], range: 0 },
            [INSTAGRAM_ITEMS]: [],

            [ITEMS]: [],
            [RANGE]: 0,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },
        actions,
        mutations,
        getters,
    };
}
