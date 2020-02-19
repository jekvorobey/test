/**
 * @Module
 */

/**
 * Модуль компонента Landing
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Landing',
            path: '/',
            component: () => import(/* webpackChunkName: "landing-view" */ './Landing.vue'),
        },
    ],
};
