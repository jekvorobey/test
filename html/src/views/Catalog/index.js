import { productGroupTypes } from '../../assets/scripts/enums';

/**
 * @Module
 */

const CatalogAsync = () => import(/* webpackChunkName: "catalog-view" */ './Catalog.vue');

/**
 * Модуль компонента Catalog
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: `/:type(${productGroupTypes.CATALOG})/:code?/filters/*`,
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
        {
            name: 'Catalog',
            path: `/:type(${productGroupTypes.CATALOG})/:code?`,
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
        {
            path: `/:type(${productGroupTypes.BRANDS}|${productGroupTypes.PROMO}|${productGroupTypes.SETS})/:entityCode/:code?/filters/*`,
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
        {
            path: `/:type(${productGroupTypes.BRANDS}|${productGroupTypes.PROMO}|${productGroupTypes.SETS})/:entityCode/:code?`,
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
    ],
};
