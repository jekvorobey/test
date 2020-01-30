/**
 * @Module
 */

const BrandsAsync = () => import(/* webpackChunkName: "brands-view" */ './Brands.vue');

/**
 * Модуль компонента Brands
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Brands',
            path: '/brands',
            component: BrandsAsync,
        },
    ],
};
