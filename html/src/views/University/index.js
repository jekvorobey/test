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
            path: '/university',
            component: UniversityAsync,
        },
    ],
};
