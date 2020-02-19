/**
 * @Module
 */

const CabinetAsync = () => import(/* webpackChunkName: "cabinet-view" */ './Cabinet.vue');

/**
 * Модуль компонента Cabinet
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Cabinet',
            path: '',
            component: CabinetAsync,
        },
    ],
};
