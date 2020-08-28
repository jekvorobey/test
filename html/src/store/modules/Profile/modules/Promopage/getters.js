import { PROMOPAGE_PRODUCTS_PAGE_SIZE } from '@constants/profile';

export const PAGES_COUNT = 'pagesCount';
export const ITEMS_IDS_MAP = 'itemsIdsMap';

export default {
    [PAGES_COUNT](state) {
        const { range = 0 } = state;
        return Math.ceil(range / PROMOPAGE_PRODUCTS_PAGE_SIZE);
    },

    [ITEMS_IDS_MAP](state) {
        const { itemsIds = [] } = state;
        const map = {};

        // eslint-disable-next-line no-restricted-syntax
        for (const id of itemsIds) map[id] = id;
        return map;
    },
};
