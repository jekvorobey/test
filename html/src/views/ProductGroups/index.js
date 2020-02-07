import { productGroupTypes } from '../../assets/scripts/enums';

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
        },
    ],
};
