import { cartItemTypes } from '../../assets/scripts/enums';
import isCartEmpty from '../../router/middleware/isCartEmpty';
import hasSession from '../../router/middleware/hasSession';

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
            path: `/checkout/:type(${cartItemTypes.PRODUCT}|${cartItemTypes.MASTERCLASS})`,
            component: CheckoutAsync,
            meta: {
                middleware: [hasSession, isCartEmpty],
            },
        },
    ],
};
