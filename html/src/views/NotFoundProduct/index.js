import notFound from '@router/middleware/notFound';

/**
 * @Module
 */

const NotFoundAsync = () => import(/* webpackChunkName: "not-found-view" */ './NotFoundProduct.vue');

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
            name: 'NotFoundProduct',
            component: NotFoundAsync,

            meta: {
                middleware: [notFound],
            },
        },
    ],
};
