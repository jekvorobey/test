/**
 * @Module
 */

import registerModule from '@router/middleware/registerModule';

const ReferrerAsync = () => import(/* webpackChunkName: "referrer-view" */ './Referrer.vue');
const ReferrerModuleAsync = () => import(/* webpackChunkName: "referrer-view" */ '@store/modules/Referrer');
const CatalogModuleAsync = () => import(/* webpackChunkName: "catalog-view" */ '@store/modules/Catalog');

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
            path: '/referrer/:code/',
            pathToRegexpOptions: { strict: true },
            component: ReferrerAsync,

            meta: {
                middleware: [registerModule(ReferrerModuleAsync), registerModule(CatalogModuleAsync)],
                skipScroll: true,
            },
        },
    ],
};
