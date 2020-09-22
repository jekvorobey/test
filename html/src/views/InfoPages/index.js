import { infoPages } from '@enums';

/**
 * @Module
 */
const types = Object.values(infoPages);
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
            path: `/:page(${types.join('|')})`,
            component: InfoPages,
        },
    ],
};
