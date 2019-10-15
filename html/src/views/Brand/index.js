/**
 * @Module
 */

const BrandAsync = () => import(/* webpackChunkName: "brand-view" */ './Brand.vue');

/**
 * Модуль компонента Brand
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/brand/:brandCode/:code',
            alias: '/brand/:brandCode/:code*',
            component: BrandAsync,
            meta: {
                skipScroll: true,
            },
        },
    ],
};
