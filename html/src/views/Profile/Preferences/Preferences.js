/**
 * @Module
 */

const PreferencesAsync = () => import(/* webpackChunkName: "preferences-view" */ './Preferences.vue');

/**
 * Модуль компонента Preferences
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Preferences',
            path: 'preferences',
            component: PreferencesAsync,
        },
    ],
};
