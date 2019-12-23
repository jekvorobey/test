/**
 * @Module
 */

const ProductAsync = () => import(/* webpackChunkName: "product-view" */ './Product.vue');

/**
 * Модуль компонента Product
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Product',
            path: '/catalog/:categoryCode/:code',
            component: ProductAsync,
        },
    ],
};
