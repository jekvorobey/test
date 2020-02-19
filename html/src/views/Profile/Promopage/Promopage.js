/**
 * @Module
 */

const PromopageAsync = () => import(/* webpackChunkName: "promopage-view" */ './Promopage.vue');

/**
 * Модуль компонента Promopage
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Promopage',
            path: 'promopage',
            component: PromopageAsync,
        },
    ],
};
