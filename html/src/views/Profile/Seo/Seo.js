/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';

const SeoAsync = () => import(/* webpackChunkName: "seo-view" */ './Seo.vue');

/**
 * Модуль компонента Promopage
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Seo',
            path: 'seo',
            component: SeoAsync,

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
