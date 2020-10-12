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
            path: '/ui-kit/:type/',
            pathToRegexpOptions: { strict: true },
            component: () => import(/* webpackChunkName: "ui-kit" */ './UiKit.vue'),
        },
        {
            path: '/ui-kit/',
            pathToRegexpOptions: { strict: true },
            redirect: '/ui-kit/base',
        },
    ],
};
