/**
 * @Module
 */

const ProPreferencesAsync = () => import(/* webpackChunkName: "pro-preferences-view" */ './ProPreferences.vue');

/**
 * Модуль компонента ProPreferences
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: 'pro-preferences',
            component: ProPreferencesAsync,
        },
    ],
};
