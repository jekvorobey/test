/**
 * @Module
 */

const SetsAsync = () => import(/* webpackChunkName: "sets-view" */ './Sets.vue');

/**
 * Модуль компонента Sets
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Sets',
            path: '/sets',
            component: SetsAsync,
        },
    ],
};
