/**
 * @Module
 */

const ReturnAsync = () => import(/* webpackChunkName: "return-view" */ './Return.vue');

/**
 * Модуль компонента Return
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'ReturnPage',
            path: 'return',
            component: ReturnAsync,
        },
    ],
};
