import { productGroupTypes } from '../../assets/scripts/constants';

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
            path: `/:type(${productGroupTypes.NEW}|${productGroupTypes.PROMO}|${productGroupTypes.SETS}|${productGroupTypes.BRANDS})`,
            component: ProductGroupsAsync,
        },
    ],
};
