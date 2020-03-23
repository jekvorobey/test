import { ORDERS_PAGE_SIZE } from '@constants/profile';

export const PAGES_COUNT = 'pagesCount';

export default {
    [PAGES_COUNT](state) {
        return Math.ceil(state.range / ORDERS_PAGE_SIZE);
    },
};
