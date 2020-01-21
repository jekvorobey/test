/**
 * @Module
 */

const ReferalOrdersAsync = () => import(/* webpackChunkName: "referal-orders-view" */ './ReferalOrders.vue');

/**
 * Модуль компонента ReferalOrders
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'ReferalOrders',
            path: 'referal-orders',
            component: ReferalOrdersAsync,
        },
    ],
};