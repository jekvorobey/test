import { productGroupTypes } from '@enums/product';
import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */

const ProductAsync = () => import(/* webpackChunkName: "product-view" */ './Product.vue');
const ProductModuleAsync = () => import(/* webpackChunkName: "product-view" */ '@store/modules/Product');
const ReviewsModuleAsync = () => import(/* webpackChunkName: "product-view" */ '@store/modules/Reviews');

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
            path: `/:type(${productGroupTypes.CATALOG})/:categoryCode/:code/`,
            pathToRegexpOptions: { strict: true },
            component: ProductAsync,

            meta: {
                middleware: [registerModule(ProductModuleAsync), registerModule(ReviewsModuleAsync)],
            },
        },
    ],
};
