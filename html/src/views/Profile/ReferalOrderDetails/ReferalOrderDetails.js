/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';

const ReferalOrderDetailsAsync = () =>
    import(/* webpackChunkName: "referal-order-details-view" */ './ReferalOrderDetails.vue');

/**
 * Модуль компонента ReferalOrderDetails
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'ReferalOrderDetails',
            path: 'referal-orders/:referalId',
            component: ReferalOrderDetailsAsync,

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
