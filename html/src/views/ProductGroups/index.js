import { productGroupTypes } from '../../assets/scripts/enums/product';

/**
 * @Module
 */

const ProductGroupsAsync = () => import(/* webpackChunkName: "product-groups-view" */ './ProductGroups.vue');

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
            path: `/:type(${productGroupTypes.PROMO}|${productGroupTypes.SETS}|${productGroupTypes.BRANDS}|${productGroupTypes.MASTERCLASSES})`,
            component: ProductGroupsAsync,
            meta: {
                skipScroll: true,
            },
        },
    ],
};
