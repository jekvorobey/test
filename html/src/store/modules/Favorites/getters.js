import { $logger } from '@services';

import { FAVORITES_PAGE_SIZE } from '@constants/favorites';

export const PAGES_COUNT = 'pagesCount';

export const FAVORITES_COUNT = 'favoritesCount';
export const FAVORITES_MAP = 'favoritesMap';
export const IS_IN_FAVORITES = 'isInFavorites';

export default {
    [PAGES_COUNT](state) {
        return Math.ceil(state.favorites.range / FAVORITES_PAGE_SIZE);
    },

    [FAVORITES_MAP](state) {
        const result = {};
        for (let i = 0; i < state.favoritesAll.length; i++) {
            const id = state.favoritesAll[i];
            result[id] = id;
        }
        return result;
    },

    [IS_IN_FAVORITES]: (state, getters) => (id) => {
        return !!getters[FAVORITES_MAP][id];
    },
};
