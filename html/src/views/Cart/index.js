import hasSession from '@router/middleware/hasSession';
// import canUserBuy from '@router/middleware/canUserBuy'; // для routes.meta.middleware если canBy обязателен
import setUser from '@router/middleware/setUser';

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
            path: '/cart/',
            pathToRegexpOptions: { strict: true },
            component: CartAsync,

            meta: {
                hideDefaultHeader: true,
                middleware: [hasSession, setUser],
            },
        },
    ],
};
