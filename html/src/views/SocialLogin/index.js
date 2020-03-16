import socialLogin from '@router/middleware/socialLogin';

/**
 * @Module
 */

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
            meta: {
                middleware: [socialLogin],
            },
        },
    ],
};
