import hasSession from '@router/middleware/hasSession';
import canUserBuy from '@router/middleware/canUserBuy';

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
                hideDefaultHeader: true,
                middleware: [hasSession, canUserBuy],
            },
        },
    ],
};
