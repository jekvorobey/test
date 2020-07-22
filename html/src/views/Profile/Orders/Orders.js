/**
 * @Module
 */

const OrdersAsync = () => import(/* webpackChunkName: "orders-view" */ './Orders.vue');

/**
 * Модуль компонента Orders
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Orders',
            path: 'orders',
            component: OrdersAsync,

            meta: {
                skipScroll: true,
            },
        },
    ],
};
