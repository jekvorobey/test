import { productGroupTypes } from '@enums/product';
import registerModule from '@router/middleware/registerModule';

/**
 * @Module
 */

const ProductGroupsAsync = () => import(/* webpackChunkName: "product-groups-view" */ './ProductGroups.vue');
const ProductGroupsModuleAsync = () =>
    import(/* webpackChunkName: "product-groups-view" */ '@store/modules/ProductGroups');

/**
 * Модуль компонента ProductGroups
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            name: 'ProductGroups',
            path: `/:type(${productGroupTypes.PROMO}|${productGroupTypes.SETS}|${productGroupTypes.BRANDS})/`,
            pathToRegexpOptions: { strict: true },
            component: ProductGroupsAsync,
            meta: {
                skipScroll: true,
                middleware: [registerModule(ProductGroupsModuleAsync)],
            },
        },
    ],
};
