import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'promocodes';
export const LOAD = 'load';

export const ITEMS = 'items';
export const CATEGORIES = 'categories';
export const BRANDS = 'brands';
export const OFFERS = 'offers';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD]: false,

            [ITEMS]: [],
            [CATEGORIES]: {},
            [BRANDS]: {},
            [OFFERS]: {},
        },

        actions,
        mutations,
        getters,
    };
}
