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
            path: '/catalog/:code',
            component: CatalogAsync,
            exact: true,
        },
    ],
};
