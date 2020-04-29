/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';

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

        {
            name: 'ProPreferences',
            path: 'pro-preferences',
            component: PreferencesAsync,

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
