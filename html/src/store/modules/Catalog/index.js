import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'catalog';

export const LOAD_PATH = 'loadPath';
export const TYPE = 'type';

export const CATEGORY_ID = 'categoryId';
export const CATEGORY_CODE = 'categoryCode';
export const CATEGORIES = 'categories';
export const ITEMS = 'items';
export const FILTERS = 'filters';
export const RANGE = 'range';
export const BANNER = 'banner';

export const ENTITY_CODE = 'entityCode';
export const PRODUCT_GROUP = 'productGroup';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [LOAD_PATH]: '',
        [TYPE]: null,
        [ENTITY_CODE]: null,
        [CATEGORY_CODE]: null,

        [PRODUCT_GROUP]: null,
        [BANNER]: {},

        [CATEGORIES]: [],
        [FILTERS]: [],

        [ITEMS]: [],
        [RANGE]: 0,
    },
    actions,
    mutations,
    getters,
};
