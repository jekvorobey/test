import { PROMOPAGE_PRODUCTS_PAGE_SIZE } from '@constants/profile';

export const PAGES_COUNT = 'pagesCount';

export default {
    [PAGES_COUNT]({ range }) {
        return Math.ceil(range / PROMOPAGE_PRODUCTS_PAGE_SIZE);
    },
};
