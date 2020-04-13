import { $logger } from '@services';

import { FAVORITES_PAGE_SIZE } from '@constants/favorites';

export const PAGES_COUNT = 'pagesCount';

export const FAVORITES_COUNT = 'favoritesCount';

export default {
    [PAGES_COUNT](state) {
        return Math.ceil(state.favorites.range / FAVORITES_PAGE_SIZE);
    },
};
