import { cartItemTypes } from '../../assets/scripts/constants';
import isCartEmpty from './middleware/isCartEmpty';

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
                middleware: [isCartEmpty],
            },
        },
    ],
};
