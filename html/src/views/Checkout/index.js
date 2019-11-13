import { cartItemTypes } from '../../assets/scripts/constants';

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
            path: `/checkout/:type(${cartItemTypes.PRODUCT}|${cartItemTypes.MASTERCLASS})`,
            component: CheckoutAsync,
        },
    ],
};
