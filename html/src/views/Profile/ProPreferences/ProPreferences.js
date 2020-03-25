/**
 * @Module
 */

import isUserReferral from '@router/middleware/isUserReferral';

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

            meta: {
                middleware: [isUserReferral],
            },
        },
    ],
};
