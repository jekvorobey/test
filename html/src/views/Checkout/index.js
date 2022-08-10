import { cartItemTypes } from '@enums/product';

import registerModule from '@router/middleware/registerModule';
import hasSession from '@router/middleware/hasSession';
// import canUserBuy from '@router/middleware/canUserBuy'; // для routes.meta.middleware
import isCartEmpty from '@router/middleware/isCartEmpty';
import setUser from '@router/middleware/setUser';

/**
 * @Module
 */

const CheckoutAsync = () => import(/* webpackChunkName: "checkout-view" */ './Checkout.vue');
const ProfileModuleAsync = () => import(/* webpackChunkName: "profile-view" */ '@store/modules/Profile');

/**
 * Модуль компонента Checkout
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Checkout',
            path: `/checkout/:type(${cartItemTypes.PRODUCT}|${cartItemTypes.MASTERCLASS})/`,
            pathToRegexpOptions: { strict: true },
            component: CheckoutAsync,

            meta: {
                hideDefaultHeader: true,
                middleware: [hasSession, setUser, isCartEmpty, registerModule(ProfileModuleAsync)],
            },
        },
    ],
};
