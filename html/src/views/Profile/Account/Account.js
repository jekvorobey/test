/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';
import createCard from '@router/middleware/createCard';

const AccountAsync = () => import(/* webpackChunkName: "account-view" */ './Account.vue');

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
                skipScroll: true,
            },
        },
        {
            path: 'account-card',
            meta: {
                middleware: [isUserReferral, createCard],
            },
        },
    ],
};
