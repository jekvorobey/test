import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const PRODUCT = 'product';
export const PRODUCT_CODE = 'productCode';
export const PRODUCT_OPTIONS = 'productOptions';

export const REFERRER_CODE = 'referrerCode';

export const FEATURED_PRODUCTS = 'featuredProducts';
export const BANNERS = 'banners';
export const MASTERCLASSES = 'masterClasses';
export const PICKUP_POINTS = 'pickupPoints';
export const SELECTED_PICKUP_POINT = 'selectedPickupPoint';
export const SELECTED_INDEX = 'selectedIndex';

export const PICKUP_POINT_TYPES = 'pickupPointTypes';
export const SELECTED_PICKUP_POINT_TYPE = 'selectedPickupPointType';

export const PRODUCT_BUNDLES = 'productBundles';
export const NAME = 'product';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [REFERRER_CODE]: null,

            [PRODUCT]: {},
            [PRODUCT_OPTIONS]: null,
            [PRODUCT_CODE]: null,

            [FEATURED_PRODUCTS]: { items: [], range: 0 },
            [BANNERS]: [],
            [MASTERCLASSES]: [],
            [PICKUP_POINTS]: [],
            [SELECTED_INDEX]: -1,
            [SELECTED_PICKUP_POINT]: null,

            [PICKUP_POINT_TYPES]: [],
            [SELECTED_PICKUP_POINT_TYPE]: null,

            [PRODUCT_BUNDLES]: [],
        },
        actions,
        mutations,
        getters,
    };
}
