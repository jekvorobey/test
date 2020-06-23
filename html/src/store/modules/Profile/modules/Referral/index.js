import { DEFAULT_PAGE } from '@constants';
import { sortDirections } from '@enums';
import { referralOrderSortFields } from '@enums/profile';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'referral';
export const LOAD = 'load';
export const ITEMS = 'items';
export const RANGE = 'range';

export const REFERRAL_DATA = 'referralData';
export const REFERRER_ID = 'referrerId';
export const REFERRAL_ORDER_DETAILS = 'referralOrderDetails';
export const ORDER_DIRECTION = 'orderDirection';
export const ORDER_FILTER_FIELD = 'orderFilterField';
export const ORDER_FIELD = 'orderField';
export const ACTIVE_PAGE = 'activePage';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,

            [REFERRAL_DATA]: null,
            [ITEMS]: [],
            [RANGE]: 0,

            [REFERRER_ID]: null,
            [REFERRAL_ORDER_DETAILS]: {},

            [ORDER_DIRECTION]: sortDirections.DESC,
            [ORDER_FILTER_FIELD]: null,
            [ORDER_FIELD]: referralOrderSortFields.NAME,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },

        actions,
        mutations,
        getters,
    };
}
