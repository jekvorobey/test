import { DEFAULT_PAGE } from '@constants';
import { sortDirections } from '@enums';
import { sortFields } from '@enums/order';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'promocodes';
export const LOAD_PATH = 'loadPath';

export const ITEMS = 'items';
export const CATEGORIES = 'categories';
export const BRANDS = 'brands';
export const OFFERS = 'offers';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [LOAD_PATH]: '',

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
