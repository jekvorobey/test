/**
 * @Module
 */

/**
 * Модуль компонента ItemDetail
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'item',
            path: '/item/:id(\\d+)',
            component: () => import(/* webpackChunkName: "item-detail" */ './ItemDetail.vue'),
        },
    ],
};
