import { SEO_PRODUCTS_PAGE_SIZE } from '@constants/profile';

export const PAGES_COUNT = 'pagesCount';

export default {
    [PAGES_COUNT]({ range }) {
        return Math.ceil(range / SEO_PRODUCTS_PAGE_SIZE);
    },
};
