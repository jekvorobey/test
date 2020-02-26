import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'preferences';
export const AVAILABLE_BRANDS = 'availableBrands';
export const AVAILABLE_CATEGORIES = 'availableCategories';
export const LOAD = 'load';

export const CUSTOMER = 'customer';

export default {
    name: NAME,
    namespaced: true,

    state: {
        [LOAD]: false,

        [CUSTOMER]: {
            brands: [],
            categories: [],
        },

        [AVAILABLE_BRANDS]: [],
        [AVAILABLE_CATEGORIES]: [],
    },

    actions,
    mutations,
    getters,
};
