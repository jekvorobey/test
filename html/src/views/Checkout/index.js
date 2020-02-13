import { cartItemTypes } from '../../assets/scripts/enums';
import isCartEmpty from '../../router/middleware/isCartEmpty';

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
                // middleware: [isCartEmpty],
            },
        },
    ],
};
