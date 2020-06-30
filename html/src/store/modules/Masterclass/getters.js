import { MASTERCLASSES_PAGE_SIZE } from '@constants/masterclasses';

export const ACTIVE_PAGE = 'activePage';
export const PAGES_COUNT = 'pagesCount';

export default {
    [PAGES_COUNT](state) {
        return Math.ceil(state.range / MASTERCLASSES_PAGE_SIZE);
    },
};
