/**
 * @Module
 */

/**
 * Модуль компонента UserDetail
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'user',
            path: '/user/:id',
            component: () => import(/* webpackChunkName: "user-detail" */ './UserDetail.vue'),
        },
    ],
};
