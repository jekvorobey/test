/**
 * @Module
 */

const AccountAsync = () => import(/* webpackChunkName: "account-view" */ './Account.vue');

import isUserReferral from '@router/middleware/isUserReferral';

/**
 * Модуль компонента Account
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Account',
            path: 'account',
            component: AccountAsync,

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
