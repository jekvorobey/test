import { infoPages, agreementTypes } from '@enums';

/**
 * @Module
 */
const infoPagesValues = Object.values(infoPages);
const agreementTypeValues = Object.values(agreementTypes);
const types = infoPagesValues.concat(agreementTypeValues);

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
            path: `/:page(${types.join('|')})/`,
            pathToRegexpOptions: { strict: true },
            component: InfoPages,
        },
        {
            name: 'PageRoute',
            path: `/pages/:page/`,
            pathToRegexpOptions: { strict: true },
            component: InfoPages,
        },
    ],
};
