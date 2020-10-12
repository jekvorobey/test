/**
 * @Module
 */
import isUserReferral from '@router/middleware/isUserReferral';

const ReferalAsync = () => import(/* webpackChunkName: "referal-view" */ './Referal.vue');

/**
 * Модуль компонента Referal
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Referal',
            path: 'referal/',
            pathToRegexpOptions: { strict: true },
            component: ReferalAsync,

            meta: {
                middleware: [isUserReferral],
                skipScroll: true,
            },
        },
    ],
};
