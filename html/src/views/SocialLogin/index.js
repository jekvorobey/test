/**
 * @Module
 */

const SocialLoginAsync = () => import(/* webpackChunkName: "social-login-view" */ './SocialLogin.vue');

/**
 * Модуль компонента SocialLogin
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/social-login/:driver*',
            component: SocialLoginAsync,
        },
    ],
};
