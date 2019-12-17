/**
 * @Module
 */

const ReferalAsync = () => import(/* webpackChunkName: "referal-view" */ './Referal.vue');

/**
 * Модуль компонента Referal
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: 'referal',
            component: ReferalAsync,
        },
    ],
};
