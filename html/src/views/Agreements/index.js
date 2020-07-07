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
            path: '/agreements',
            component: Agreements,
        }
    ],
};
