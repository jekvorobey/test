import { infoPages } from '@enums';

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
            path: '/info-pages/:page',
            component: InfoPages,
        },
        {
            path: '/info-pages',
            redirect: `/info-pages/${infoPages.VACANCIES}`,
        }
    ],
};
