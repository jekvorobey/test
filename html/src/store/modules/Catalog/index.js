import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'catalog';

export const LOAD_PATH = 'loadPath';

export const TYPE = 'type';
export const ENTITY_CODE = 'entityCode';
export const CATEGORY_CODE = 'categoryCode';

export const CATEGORIES = 'categories';
export const FILTERS = 'filters';
export const BANNER = 'banner';
export const ITEMS = 'items';
export const RANGE = 'range';
export const PRODUCT_GROUP = 'productGroup';

export const ROUTE_SEGMENTS = 'routeSegments';
export const FILTER_SEGMENTS = 'filterSegments';
export const ACTIVE_CATEGORIES = 'activeCategories';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [LOAD_PATH]: '',
        [TYPE]: '',
        [ENTITY_CODE]: '',
        [CATEGORY_CODE]: '',

        [PRODUCT_GROUP]: null,
        [BANNER]: {},

        [CATEGORIES]: [],
        [FILTERS]: [],

        [ITEMS]: [],
        [RANGE]: 0,

        [ROUTE_SEGMENTS]: [],
        [FILTER_SEGMENTS]: {},
        [ACTIVE_CATEGORIES]: [],
    },
    actions,
    mutations,
    getters,
};
