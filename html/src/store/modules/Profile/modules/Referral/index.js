import { DEFAULT_PAGE } from '@constants';
import { sortDirections } from '@enums';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const REFERRAL_DATA = 'referralData';

export const NAME = 'referral';
export const LOAD = 'load';
export const ITEMS = 'items';
export const RANGE = 'range';

export const ORDER_DETAILS = 'orderDetails';
export const ORDER_DIRECTION = 'orderDirection';
export const ORDER_FIELD = 'orderField';
export const ACTIVE_PAGE = 'activePage';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,

            [REFERRAL_DATA]: {},
            [ITEMS]: [],
            [RANGE]: 0,

            [ORDER_DETAILS]: {},
            [ORDER_DIRECTION]: sortDirections.DESC,
            [ORDER_FIELD]: 'name',
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },

        actions,
        mutations,
        getters,
    };
}
