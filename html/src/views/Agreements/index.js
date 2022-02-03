import { agreementTypes } from '@enums';

/**
 * @Module
 */

const types = Object.values(agreementTypes);
const Agreements = () => import(/* webpackChunkName: "agreements-view" */ './Agreements.vue');

/**
 * Модуль компонента Agreements
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Agreements',
            path: `/soglasheniya/:type(${types.join('|')})/`,
            pathToRegexpOptions: { strict: true },
            component: Agreements,
        },
        {
            path: '/soglasheniya/',
            pathToRegexpOptions: { strict: true },
            redirect: `/soglasheniya/${agreementTypes.PERSONAL_POLICY}/`,
        },
    ],
};
