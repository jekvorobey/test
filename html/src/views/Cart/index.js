import hasSession from '../../router/middleware/hasSession';

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
            name: 'Cart',
            path: '/cart',
            component: CartAsync,

            meta: {
                middleware: [hasSession],
            },
        },
    ],
};
