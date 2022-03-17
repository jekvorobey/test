import { infoPages, agreementTypes } from '@enums';

/**
 * @Module
 */
const infoPagesValues = Object.values(infoPages);
const agreementTypeValues = Object.values(agreementTypes);

const InfoPage = () => import(/* webpackChunkName: "info-page-view" */ './InfoPage.vue');

/**
 * Модуль компонента InfoPage
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'InfoPage',
            path: `/pages/:page(.*)?draft=:draft?`,
            pathToRegexpOptions: { strict: true },
            component: InfoPage,
        },
        {
            name: 'InfoPageStatic',
            path: `/:page(${infoPagesValues.join('|')})/`,
            pathToRegexpOptions: { strict: true },
            component: InfoPage,
        },
        {
            name: 'InfoPageAgreement',
            path: `/agreements/:page(${agreementTypeValues.join('|')})/`,
            pathToRegexpOptions: { strict: true },
            component: InfoPage,
        },
        {
            path: '/agreements/',
            pathToRegexpOptions: { strict: true },
            redirect: `/agreements/${agreementTypes.PERSONAL_POLICY}/`,
        },
    ],
};
