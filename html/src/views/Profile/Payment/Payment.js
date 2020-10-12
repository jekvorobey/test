/**
 * @Module
 */

const PaymentAsync = () => import(/* webpackChunkName: "payment-view" */ './Payment.vue');

/**
 * Модуль компонента Payment
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Payment',
            path: 'payment/',
            pathToRegexpOptions: { strict: true },
            component: PaymentAsync,
        },
    ],
};
