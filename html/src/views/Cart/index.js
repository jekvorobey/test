// import hasSession from '@router/middleware/hasSession'; // для routes.meta.middleware если hasSession обязателен
// import canUserBuy from '@router/middleware/canUserBuy'; // для routes.meta.middleware если canBy обязателен
import setUser from '@router/middleware/setUser';
import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */

const CartAsync = () => import(/* webpackChunkName: "cart-view" */ './Cart.vue');
const ProfileModuleAsync = () => import(/* webpackChunkName: "profile-view" */ '@store/modules/Profile');

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
                middleware: [setUser, registerModule(ProfileModuleAsync)],
            },
        },
    ],
};
