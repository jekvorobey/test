/**
 * @Module
 */

const VerificationAsync = () => import(/* webpackChunkName: "verification code" */ './VerificationCode.vue');

/**
 * Модуль компонента верификации
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/activate-user/:id',
            pathToRegexpOptions: { strict: true },
            component: VerificationAsync,
        },
    ],
};
