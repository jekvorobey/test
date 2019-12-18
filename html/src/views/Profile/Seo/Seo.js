/**
 * @Module
 */

const SeoAsync = () => import(/* webpackChunkName: "seo-view" */ './Seo.vue');

/**
 * Модуль компонента Promopage
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: 'seo',
            component: SeoAsync,
        },
    ],
};
