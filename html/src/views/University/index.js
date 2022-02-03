/**
 * @Module
 */

const UniversityAsync = () => import(/* webpackChunkName: "university-view" */ './University.vue');

/**
 * Модуль компонента University
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/universitet/',
            pathToRegexpOptions: { strict: true },
            component: UniversityAsync,
        },
    ],
};
