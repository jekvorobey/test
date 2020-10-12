/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';

const PromopageAsync = () => import(/* webpackChunkName: "promopage-view" */ './Promopage.vue');

/**
 * Модуль компонента Promopage
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Promopage',
            path: 'promopage/',
            pathToRegexpOptions: { strict: true },
            component: PromopageAsync,

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
