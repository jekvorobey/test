import { requestStatus } from '@enums';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'preview';
export const LOAD = 'load';

export const PRODUCT_PREVIEW_STATUS = 'productPreviewStatus';
export const PRODUCT_PREVIEW = 'productPreview';
export const PRODUCT_OPTIONS = 'productOptions';

const GROUP_ID = 'groupId';
const CODE = 'code';
const OFFER_ID = 'offerId';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [PRODUCT_PREVIEW_STATUS]: requestStatus.PENDING,
            [PRODUCT_OPTIONS]: null,
            [PRODUCT_PREVIEW]: null,

            [GROUP_ID]: null,
            [CODE]: null,
            [OFFER_ID]: null,
        },
        actions,
        mutations,
        getters,
    };
}
