/**
 * @Module
 */

const OrderDetailsAsync = () => import(/* webpackChunkName: "order-details-view" */ './OrderDetails.vue');

/**
 * Модуль компонента Orders
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'OrderDetails',
            path: 'orders/:orderId',
            component: OrderDetailsAsync,
        },
    ],
};
