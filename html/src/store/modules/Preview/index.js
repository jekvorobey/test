import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'preview';
export const PRODUCT_PREVIEW = 'productPreview';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [PRODUCT_PREVIEW]: null,
    },
    actions,
    mutations,
    getters,
};
