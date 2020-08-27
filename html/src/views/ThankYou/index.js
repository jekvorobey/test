import hasSession from '@router/middleware/hasSession';
import setUser from '@router/middleware/setUser';

/**
 * @Module
 */

const ThankYouAsync = () => import(/* webpackChunkName: "thank-you-view" */ './ThankYou.vue');

/**
 * Модуль компонента ThankYou
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/thank-you/:id',
            component: ThankYouAsync,

            meta: {
                hideDefaultHeader: true,
                middleware: [hasSession, setUser],
            },
        },
    ],
};
