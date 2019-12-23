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
            name: 'ProPreferences',
            path: 'pro-preferences',
            component: ProPreferencesAsync,
        },
    ],
};
