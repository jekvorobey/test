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
            path: '/about-us',
            component: AboutUsAsync,
        },
    ],
};
