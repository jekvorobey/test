/**
 * @Module
 */

const AboutUsAsync = () => import(/* webpackChunkName: "about-us-view" */ './AboutUs.vue');

/**
 * Модуль компонента AboutUs
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/o-nas/',
            pathToRegexpOptions: { strict: true },
            component: AboutUsAsync,
        },
    ],
};
