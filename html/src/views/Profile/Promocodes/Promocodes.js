/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';

const PromocodesAsync = () => import(/* webpackChunkName: "promocodes-view" */ './Promocodes.vue');

/**
 * Модуль компонента Promocodes
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Promocodes',
            path: 'promocodes/',
            pathToRegexpOptions: { strict: true },
            component: PromocodesAsync,

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
