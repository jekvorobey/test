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
            path: `/agreements/:type(${types.join('|')})/`,
            pathToRegexpOptions: { strict: true },
            component: Agreements,
        },
        {
            path: '/agreements/',
            pathToRegexpOptions: { strict: true },
            redirect: `/agreements/${agreementTypes.PERSONAL_POLICY}/`,
        },
    ],
};
