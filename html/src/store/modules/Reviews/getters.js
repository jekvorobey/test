import { DEFAULT_REVIEWS_PAGE_SIZE } from '@constants';

export const PAGES_COUNT = 'pagesCount';

export default {
    [PAGES_COUNT]: (state) => {
        const { range = 0 } = state;
        return Math.ceil(range / DEFAULT_REVIEWS_PAGE_SIZE);
    },
};
