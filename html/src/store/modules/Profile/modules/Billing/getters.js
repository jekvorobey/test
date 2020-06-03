import { BILLING_OPERATIONS_PAGE_SIZE } from '@constants/profile';

const BILLING_DATA = 'billingData';

export const PAGES_COUNT = 'pagesCount';
export const HAS_PAYMENT_INFO = 'hasPaymentInfo';

export default {
    [PAGES_COUNT]({ range }) {
        return Math.ceil(range / BILLING_OPERATIONS_PAGE_SIZE);
    },

    [HAS_PAYMENT_INFO](state) {
        const billingData = state[BILLING_DATA] || {};
        return billingData.payment_info || false;
    },
};
