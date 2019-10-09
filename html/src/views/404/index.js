/**
 * @Module
 */

const NotFoundAsync = () => import(/* webpackChunkName: "404-view" */ './404.vue');

/**
 * Модуль компонента 404
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '*',
            component: NotFoundAsync,
        },
    ],
};
