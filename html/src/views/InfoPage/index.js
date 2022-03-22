import { infoPages, agreementTypes } from '@enums';
import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */
const infoPagesValues = Object.values(infoPages);
const agreementTypeValues = Object.values(agreementTypes);

const InfoPage = () => import(/* webpackChunkName: "info-page-view" */ './InfoPage.vue');
const InfoPageModule = () => import(/* webpackChunkName: "info-page-view" */ '@store/modules/InfoPage');

const DeliveryAndPayment = () => import(/* webpackChunkName: "info-page-view" */ './DeliveryAndPayment.vue');

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
            path: `/pages/:code(.*)`,
            pathToRegexpOptions: { strict: true },
            component: InfoPage,
            meta: {
                middleware: [registerModule(InfoPageModule)],
            },
        },
        {
            name: 'DeliveryAndPayment',
            path: '/delivery-and-payment/',
            pathToRegexpOptions: { strict: true },
            component: DeliveryAndPayment,
        },
        {
            name: 'InfoPageStatic',
            path: `/:code(${infoPagesValues.join('|')})/`,
            pathToRegexpOptions: { strict: true },
            component: InfoPage,
            meta: {
                middleware: [registerModule(InfoPageModule)],
            },
        },
        {
            name: 'InfoPageAgreement',
            path: `/agreements/:code(${agreementTypeValues.join('|')})/`,
            pathToRegexpOptions: { strict: true },
            component: InfoPage,
            meta: {
                middleware: [registerModule(InfoPageModule)],
            },
        },
        {
            path: '/agreements/',
            pathToRegexpOptions: { strict: true },
            redirect: `/agreements/${agreementTypes.PERSONAL_POLICY}/`,
            meta: {
                middleware: [registerModule(InfoPageModule)],
            },
        },
    ],
};
