import { cartItemTypes } from '@enums/product';

/**
 * @Module
 */

const ThankYouAsync = () => import(/* webpackChunkName: "thank-you-view" */ './ThankYou.vue');

/**
 * Модуль компонента ThankYou
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: `/thank-you/:type(${cartItemTypes.MASTERCLASS}|${cartItemTypes.PRODUCT})`,
            component: ThankYouAsync,
        },
    ],
};
