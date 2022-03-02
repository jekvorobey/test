/**
 * @Module
 */
const InfoPages = () => import(/* webpackChunkName: "info-pages-view" */ './InfoPages.vue');

/**
 * Модуль компонента InfoPages
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'InfoPages',
            path: `/:page/`,
            pathToRegexpOptions: { strict: true },
            component: InfoPages,
        },
    ],
};
