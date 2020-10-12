/**
 * @Module
 */

const HowItWorksAsync = () => import(/* webpackChunkName: "how-it-works-view" */ './HowItWorks.vue');

/**
 * Модуль компонента HowItWorks
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'HowItWorks',
            path: 'how-it-works/',
            pathToRegexpOptions: { strict: true },
            component: HowItWorksAsync,
        },
    ],
};
