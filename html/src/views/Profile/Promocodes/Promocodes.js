/**
 * @Module
 */

const PromocodesAsync = () => import(/* webpackChunkName: "promocodes-view" */ './Promocodes.vue');

/**
 * Модуль компонента Promocodes
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Promocodes',
            path: 'promocodes',
            component: PromocodesAsync,
        },
    ],
};
