import { productGroupTypes } from '@enums/product';

/**
 * @Module
 */

const ProductAsync = () => import(/* webpackChunkName: "product-view" */ './Product.vue');

/**
 * Модуль компонента Product
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'Product',
            path: `/:type(${productGroupTypes.CATALOG})/:categoryCode/:code`,
            component: ProductAsync,
        },
    ],
};
