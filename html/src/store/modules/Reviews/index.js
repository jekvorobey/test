import { DEFAULT_PAGE } from '@constants';
import { deliveryMethods } from '@enums/checkout';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const REVIEWS = 'reviews';
export const RANGE = 'range';
export const RATING = 'rating';
export const ACTIVE_PAGE = 'activePage';

export const NAME = 'reviews';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [REVIEWS]: [],
            [RANGE]: 0,
            [RATING]: 0,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },
        actions,
        mutations,
        getters,
    };
}
