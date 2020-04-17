import { $logger } from '@services';

import { FAVORITES_PAGE_SIZE } from '@constants/favorites';

export const PAGES_COUNT = 'pagesCount';

export const FAVORITE_ITEMS_COUNT = 'favoriteItemsCount';
export const FAVORITES_MAP = 'favoritesMap';
export const IS_IN_FAVORITES = 'isInFavorites';

export default {
    [FAVORITE_ITEMS_COUNT]({ favoritesAll = [] }) {
        return favoritesAll.length;
    },

    [PAGES_COUNT](state) {
        return Math.ceil(state.range / FAVORITES_PAGE_SIZE);
    },

    [FAVORITES_MAP]({ favoritesAll }) {
        const result = {};
        for (let i = 0; i < favoritesAll.length; i++) {
            const id = favoritesAll[i];
            result[id] = id;
        }
        return result;
    },

    [IS_IN_FAVORITES]: (state, getters) => (id) => {
        const result = Boolean(getters[FAVORITES_MAP][id]);
        return result;
    },
};
