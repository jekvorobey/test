import { DEFAULT_PAGE } from '@constants';
import { sortDirections } from '@enums';
import { sortFields } from '@enums/order';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const REFERRAL_DATA = 'referralData';

export const NAME = 'orders';
export const LOAD_PATH = 'loadPath';

export const FILTERS = 'filters';
export const ORDERS = 'orders';
export const ORDER_DETAILS = 'orderDetails';

export const ORDER = 'order';
export const DELIVERIES = 'deliveries';
export const TICKETS = 'tickets';

export const ORDER_DIRECTION = 'orderDirection';
export const ORDER_FIELD = 'orderField';
export const ACTIVE_PAGE = 'activePage';
export const RANGE = 'range';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD_PATH]: '',

            [REFERRAL_DATA]: {},
            [FILTERS]: [],
            [ORDERS]: [],
            [RANGE]: 0,
            [ORDER_DETAILS]: {
                [ORDER]: {},
                [DELIVERIES]: [],
                [TICKETS]: [],
            },

            [ORDER_DIRECTION]: sortDirections.DESC,
            [ORDER_FIELD]: sortFields.NUMBER,
            [ACTIVE_PAGE]: DEFAULT_PAGE,
        },

        actions,
        mutations,
        getters,
    };
}
