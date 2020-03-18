import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const INSTAGRAM_ITEMS = 'instagramItems';
export const FEATURED_PRODUCTS = 'featuredProducts';
export const BANNERS = 'banners';
export const MASTERCLASSES = 'masterClasses';
export const PRODUCT_ID = 'productId';
export const PRODUCT_CODE = 'productCode';
export const PRODUCT = 'product';
export const PRODUCT_OPTIONS = 'productOptions';

export const NAME = 'product';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [FEATURED_PRODUCTS]: { items: [], range: 0 },
        [INSTAGRAM_ITEMS]: [],
        [BANNERS]: [],
        [MASTERCLASSES]: [],
        [PRODUCT]: {},
        [PRODUCT_OPTIONS]: null,
        [PRODUCT_CODE]: '',
    },
    actions,
    mutations,
    getters,
};
