import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const PRODUCT_ID = 'productId';
export const PRODUCT_CODE = 'productCode';
export const PRODUCT = 'product';

export default {
    name: 'product',
    namespaced: true,
    state: {
        [PRODUCT]: {},
        [PRODUCT_CODE]: '',
    },
    actions,
    mutations,
    getters,
};
