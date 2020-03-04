import { requestStatus } from '../../../assets/scripts/enums/general';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'preview';
export const LOAD = 'load';
export const PRODUCT_PREVIEW_STATUS = 'productPreviewStatus';
export const PRODUCT_PREVIEW = 'productPreview';

export default {
    name: NAME,
    namespaced: true,
    state: {
        [PRODUCT_PREVIEW_STATUS]: requestStatus.PENDING,
        [PRODUCT_PREVIEW]: null,
    },
    actions,
    mutations,
    getters,
};
