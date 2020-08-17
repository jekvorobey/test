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
            path: `/:page(${infoPages.VACANCIES}|${infoPages.FEEDBACK}|${infoPages.PURCHASE_RETURNS}|${infoPages.DELIVERY_AND_PAYMENT})`,
            component: InfoPages,
        },
    ],
};
