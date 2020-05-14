/**
 * @Module
 */

import registerModule from '@router/middleware/registerModule';

const LandingAsync = () => import(/* webpackChunkName: "landing-view" */ './Landing.vue');
const LandingModuleAsync = () => import(/* webpackChunkName: "landing-view" */ '@store/modules/Landing');

/**
 * Модуль компонента Landing
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Landing',
            path: '/',
            component: LandingAsync,

            meta: {
                middleware: [registerModule(LandingModuleAsync)],
            },
        },
    ],
};
