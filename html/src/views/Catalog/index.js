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
            path: `/:type(${productGroupTypes.CATALOG}|${productGroupTypes.NEW}|${productGroupTypes.BESTSELLERS}|${productGroupTypes.SEARCH})/:code?/filters/*`,
            component: CatalogAsync,
            meta: {
                middleware: [registerModule(CatalogModuleAsync)],
                skipScroll: true,
            },
        },
        {
            name: 'Catalog',
            path: `/:type(${productGroupTypes.CATALOG}|${productGroupTypes.NEW}|${productGroupTypes.BESTSELLERS}|${productGroupTypes.SEARCH})/:code?/`,
            pathToRegexpOptions: { strict: true },
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
            path: `/:type(${productGroupTypes.BRANDS}|${productGroupTypes.PROMO}|${productGroupTypes.SETS})/:entityCode/:code?/`,
            pathToRegexpOptions: { strict: true },
            component: CatalogAsync,
            meta: {
                middleware: [registerModule(CatalogModuleAsync)],
                skipScroll: true,
            },
        },
    ],
};
