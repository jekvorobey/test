import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const PRODUCT = 'product';
export const PRODUCT_CODE = 'productCode';
export const PRODUCT_OPTIONS = 'productOptions';

export const REFERRER_CODE = 'referrerCode';

export const INSTAGRAM_ITEMS = 'instagramItems';
export const FEATURED_PRODUCTS = 'featuredProducts';
export const BANNERS = 'banners';
export const MASTERCLASSES = 'masterClasses';

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
            [INSTAGRAM_ITEMS]: [],
            [BANNERS]: [],
            [MASTERCLASSES]: [],
        },
        actions,
        mutations,
        getters,
    };
}
