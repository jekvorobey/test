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
            path: '/catalog/:code?/filters/*',
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
        {
            path: '/catalog/:code?',
            component: CatalogAsync,
            meta: {
                skipScroll: true,
            },
        },
    ],
};
