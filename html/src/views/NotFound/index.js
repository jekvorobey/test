/**
 * @Module
 */

const NotFoundAsync = () => import(/* webpackChunkName: "not-found-view" */ './NotFound.vue');

/**
 * Модуль компонента 404
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: '404',
            path: '/404',
            component: NotFoundAsync,
        },
        {
            path: '*',
            redirect: '404',
        },
    ],
};
