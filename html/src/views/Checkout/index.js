import { cartItemTypes } from '@enums/product';

import hasSession from '@router/middleware/hasSession';
import canUserBuy from '@router/middleware/canUserBuy';
import isCartEmpty from '@router/middleware/isCartEmpty';
import setUser from '@router/middleware/setUser';

/**
 * @Module
 */

const CheckoutAsync = () => import(/* webpackChunkName: "checkout-view" */ './Checkout.vue');

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
                middleware: [hasSession, setUser, canUserBuy, isCartEmpty],
            },
        },
    ],
};
