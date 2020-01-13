/**
 * @Module
 */

const SubscribesAsync = () => import(/* webpackChunkName: "subscribes-view" */ './Subscribes.vue');

/**
 * Модуль компонента Subscribes
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Subscribes',
            path: 'subscribes',
            component: SubscribesAsync,
        },
    ],
};
