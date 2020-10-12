/**
 * @Module
 */

const MasterclassesAsync = () => import(/* webpackChunkName: "masterclasses-view" */ './Masterclasses.vue');

/**
 * Модуль компонента Masterclasses
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Masterclasses',
            path: 'masterclasses/',
            pathToRegexpOptions: { strict: true },
            component: MasterclassesAsync,
        },
    ],
};
