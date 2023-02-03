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
export const SEARCH_STRING = 'searchString';

export const CATEGORIES = 'categories';
export const FILTERS = 'filters';
export const BANNER = 'banner';
export const ITEMS = 'items';
export const ITEMS_REFERRER_PROMO = 'itemsReferrerPromo';
export const RANGE = 'range';
export const RANGE_WITHOUT_UNION = 'rangeWithoutUnion';
export const PRODUCT_GROUP = 'productGroup';

export const ROUTE_SEGMENTS = 'routeSegments';
export const FILTER_SEGMENTS = 'filterSegments';

export const FILTERS_STATE_MAP = 'filtersStateMap';

export const PREVIOUS_CATALOG_FETCH_PAYLOAD = 'previousCatalogFetchPayload';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [LOAD_PATH]: null,
            [TYPE]: null,
            [ENTITY_CODE]: null,
            [CATEGORY_CODE]: null,
            [BASE_CATEGORY_CODE]: null,
            [SEARCH_STRING]: null,

            [PRODUCT_GROUP]: {
                type: productGroupTypes.CATALOG,
                base: productGroupBase.FILTERS,
                excluded_filters: [],
                filters: {},
                [BANNER]: {},
            },

            [CATEGORIES]: [],
            [FILTERS]: [],
            [FILTERS_STATE_MAP]: {},

            [ITEMS]: [],
            [ITEMS_REFERRER_PROMO]: [],
            [RANGE]: 0,
            [RANGE_WITHOUT_UNION]: 0,

            [ROUTE_SEGMENTS]: [],
            [FILTER_SEGMENTS]: {},

            [PREVIOUS_CATALOG_FETCH_PAYLOAD]: {},
        },
        actions,
        mutations,
        getters,
    };
}
