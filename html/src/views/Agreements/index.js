import { agreementTypes } from '@enums';

/**
 * @Module
 */

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
            path: `/agreements/:type(${agreementTypes.PERSONAL_POLICY}|${agreementTypes.PUBLIC_OFFER})`,
            component: Agreements,
        },
    ],
};
