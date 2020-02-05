import { productGroupTypes } from '../../assets/scripts/constants';

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
            path: `/${productGroupTypes.CATALOG}/:code?/filters/*`,
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
        {
            name: 'Catalog',
            path: `/${productGroupTypes.CATALOG}/:code?`,
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
        {
            path: `/${productGroupTypes.BRANDS}/:brandCode/:code?/filters/*`,
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
        {
            path: `/${productGroupTypes.BRANDS}/:brandCode/:code?`,
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
    ],
};
