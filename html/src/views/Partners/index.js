/**
 * @Module
 */

const PartnersAsync = () => import(/* webpackChunkName: "partners-view" */ './Partners.vue');

/**
 * Модуль компонента Partners
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/partneram/',
            pathToRegexpOptions: { strict: true },
            component: PartnersAsync,
        },
    ],
};
