/**
 * @Module
 */

import registerModule from '@router/middleware/registerModule';

const ReferrerAsync = () => import(/* webpackChunkName: "referrer-view" */ './Referrer.vue');
const ReferrerModuleAsync = () => import(/* webpackChunkName: "referrer-view" */ '@store/modules/Referrer');

/**
 * Модуль компонента Referrer
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Referrer',
            path: '/referrer/:code',
            component: ReferrerAsync,

            meta: {
                middleware: [registerModule(ReferrerModuleAsync)],
                skipScroll: true,
            },
        },
    ],
};
