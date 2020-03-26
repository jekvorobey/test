import notFound from '@router/middleware/notFound';

/**
 * @Module
 */

const NotFoundAsync = () => import(/* webpackChunkName: "not-found-view" */ './NotFound.vue');

/**
 * Модуль компонента 404
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '*',
            name: 'NotFound',
            component: NotFoundAsync,
            meta: {
                middleware: [notFound],
            },
        },
    ],
};
