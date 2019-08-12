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
            name: 'ui-kit',
            path: '/ui-kit/:type',
            component: () => import(/* webpackChunkName: "ui-kit" */ './UiKit.vue'),
        },
        {
            path: '/ui-kit',
            redirect: '/ui-kit/base',
        },
    ],
};
