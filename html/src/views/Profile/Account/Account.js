/**
 * @Module
 */

const AccountAsync = () => import(/* webpackChunkName: "account-view" */ './Account.vue');

/**
 * Модуль компонента Account
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '',
            component: AccountAsync,
        },
    ],
};
