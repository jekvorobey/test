import { productGroupTypes } from '@enums/product';
import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */

const ProductAsync = () => import(/* webpackChunkName: "product-view" */ './Product.vue');
const ProductModuleAsync = () => import(/* webpackChunkName: "product-view" */ '@store/modules/Product');

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

            meta: {
                middleware: [registerModule(ProductModuleAsync)],
            },
        },
    ],
};
