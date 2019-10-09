import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const CATEGORY_ID = 'categoryId';
export const CATEGORY_CODE = 'categoryCode';
export const CATEGORIES = 'categories';
export const ITEMS = 'items';

export default {
    name: 'catalog',
    namespaced: true,
    state: {
        [CATEGORY_ID]: null,
        [CATEGORY_CODE]: null,
        [CATEGORIES]: [],
        [ITEMS]: [],
    },
    actions,
    mutations,
    getters,
};
