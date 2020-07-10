import { productGroupTypes } from '@enums/product';
import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */

const CatalogAsync = () => import(/* webpackChunkName: "catalog-view" */ './Catalog.vue');
const CatalogModuleAsync = () => import(/* webpackChunkName: "catalog-view" */ '@store/modules/Catalog');

/**
 * Модуль компонента Catalog
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: `/:type(${productGroupTypes.CATALOG}|${productGroupTypes.NEW}|${productGroupTypes.BESTSELLERS})/:code?/filters/*`,
            component: CatalogAsync,
            meta: {
                middleware: [registerModule(CatalogModuleAsync)],
                skipScroll: true,
            },
        },
        {
            name: 'Catalog',
            path: `/:type(${productGroupTypes.CATALOG}|${productGroupTypes.NEW}|${productGroupTypes.BESTSELLERS})/:code?`,
            component: CatalogAsync,
            meta: {
                middleware: [registerModule(CatalogModuleAsync)],
                skipScroll: true,
            },
        },
        {
            path: `/:type(${productGroupTypes.BRANDS}|${productGroupTypes.PROMO}|${productGroupTypes.SETS})/:entityCode/:code?/filters/*`,
            component: CatalogAsync,
            meta: {
                middleware: [registerModule(CatalogModuleAsync)],
                skipScroll: true,
            },
        },
        {
            path: `/:type(${productGroupTypes.BRANDS}|${productGroupTypes.PROMO}|${productGroupTypes.SETS})/:entityCode/:code?`,
            component: CatalogAsync,
            meta: {
                middleware: [registerModule(CatalogModuleAsync)],
                skipScroll: true,
            },
        },
    ],
};
