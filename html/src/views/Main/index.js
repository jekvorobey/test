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
            name: 'main',
            path: '/',
            component: () => import(/* webpackChunkName: "main-view" */ './Main.vue'),
        },
    ],
};
