/**
 * @Module
 */

const CartAsync = () => import(/* webpackChunkName: "cart-view" */ './Cart.vue');

/**
 * Модуль компонента Cart
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/cart',
            component: CartAsync,
        },
    ],
};
