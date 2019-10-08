/**
 * @Module
 */

/**
 * Модуль компонента Catalog
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'catalog',
            path: '/catalog',
            component: () => import(/* webpackChunkName: "catalog-view" */ './Catalog.vue'),
        },
    ],
};
