import { productGroupTypes, productGroupBase } from '@enums/product';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'catalog';
export const LOAD_PATH = 'loadPath';

export const TYPE = 'type';
export const ENTITY_CODE = 'entityCode';
export const CATEGORY_CODE = 'categoryCode';
export const BASE_CATEGORY_CODE = 'baseCategoryCode';

export const CATEGORIES = 'categories';
export const FILTERS = 'filters';
export const BANNER = 'banner';
export const ITEMS = 'items';
export const RANGE = 'range';
export const PRODUCT_GROUP = 'productGroup';

export const ROUTE_SEGMENTS = 'routeSegments';
export const FILTER_SEGMENTS = 'filterSegments';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [LOAD_PATH]: null,
        [TYPE]: null,
        [ENTITY_CODE]: null,
        [CATEGORY_CODE]: null,
        [BASE_CATEGORY_CODE]: null,

        [PRODUCT_GROUP]: {
            type: productGroupTypes.CATALOG,
            base: productGroupBase.FILTERS,
            excluded_filters: [],
            filters: {},
            [BANNER]: {},
        },

        [CATEGORIES]: [],
        [FILTERS]: [],

        [ITEMS]: [],
        [RANGE]: 0,

        [ROUTE_SEGMENTS]: [],
        [FILTER_SEGMENTS]: {},
    },
    actions,
    mutations,
    getters,
};
