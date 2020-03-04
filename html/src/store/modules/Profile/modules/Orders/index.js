import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { sortDirections } from '../../../../../assets/scripts/enums/general';
import { sortFields } from '../../../../../assets/scripts/enums/order';
import { DEFAULT_PAGE } from '../../../../../assets/scripts/constants/general';

export const NAME = 'orders';
export const LOAD = 'load';

export const ORDERS = 'orders';
export const ORDER_DETAILS = 'orderDetails';

export const ORDER_DIRECTION = 'orderDirection';
export const ORDER_FIELD = 'orderField';
export const ACTIVE_PAGE = 'activePage';

const PAGE_SIZE = 'pageSize';

export default {
    name: NAME,
    namespaced: true,

    state: {
        [LOAD]: false,

        [ORDERS]: [],
        [ORDER_DETAILS]: {},

        [ORDER_DIRECTION]: sortDirections.DESC,
        [ORDER_FIELD]: sortFields.NUMBER,
        [ACTIVE_PAGE]: DEFAULT_PAGE,
    },

    actions,
    mutations,
    getters,
};
