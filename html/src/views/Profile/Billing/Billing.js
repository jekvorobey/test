/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';

const BillingAsync = () => import(/* webpackChunkName: "billing-view" */ './Billing.vue');

/**
 * Модуль компонента Billing
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Billing',
            path: 'billing',
            component: BillingAsync,

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
