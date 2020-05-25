import { BONUSES_PAGE_SIZE } from '@constants/profile';

const INFO = 'info';
const BONUSES = 'bonuses';

export const PAGES_COUNT = 'pagesCount';

export default {
    [PAGES_COUNT]({ range }) {
        return Math.ceil(range / BONUSES_PAGE_SIZE);
    },
};
