import { DEFAULT_CATALOG_PAGE_SIZE } from '@constants';

export const PAGES_COUNT = 'pagesCount';

export default {
    [PAGES_COUNT]({ range }) {
        return Math.ceil(range / DEFAULT_CATALOG_PAGE_SIZE);
    },
};
